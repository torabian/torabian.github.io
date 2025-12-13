package main

import (
	"fmt"
	"strings"

	"github.com/myorg/mynewmicroservice/modules/plugin"

	"embed"
	"os"

	"github.com/gin-gonic/gin"

	"github.com/torabian/fireback/modules/fireback"
)

var PRODUCT_NAMESPACENAME = "fireback-microservice-boilerplate"
var PRODUCT_DESCRIPTION = "Fireback microservice boilerplate"
var PRODUCT_LANGUAGES = []string{"en"}

//go:embed all:ui
var ui embed.FS

var xapp = &fireback.FirebackApp{
	Title: PRODUCT_DESCRIPTION,

	MicroService: true,

	SupportedLanguages: PRODUCT_LANGUAGES,
	SearchProviders:    []fireback.SearchProviderFn{},
	SeedersSync: func() {

	},

	/* File uploader is a part of drive module in abac module

	RunTus: func() {
		abac.LiftTusServer()
	},

	*/

	InjectSearchEndpoint: fireback.InjectReactiveSearch,
	PublicFolders: []fireback.PublicFolderInfo{
		// You can set a series of static folders to be served along with fireback.
		// This is only for static content. For advanced MVX render templates, you need to
		// Bootstrap those themes
		// Add these two lines on the top of the file
		/////go:embed all:ui
		// var ui embed.FS
		// and then uncomment this, for example to serve static react or angular content
		{Fs: &ui, Folder: "ui"},
	},
	SetupWebServerHook: func(e *gin.Engine, xs *fireback.FirebackApp) {

		e.GET("/plugin-content/:id", func(ctx *gin.Context) {

			uid := strings.ReplaceAll(ctx.Param("id"), ".js", "")

			plugin, err := plugin.PluginActions.GetOne(fireback.QueryDSL{UniqueId: uid})
			if err != nil {
				ctx.AbortWithError(int(err.HttpCode), err)
			}

			ctx.Header("content-type", "application/javascript")
			ctx.String(200, string(plugin.Content.Blob))
		})

		e.GET("/", func(ctx *gin.Context) {

			index, err := ui.ReadFile("ui/index.html")
			if err != nil {
				ctx.AbortWithError(500, err)
			}

			plugins, _, err2 := plugin.PluginActions.Query(fireback.QueryDSL{
				ItemsPerPage:  10,
				InternalQuery: "enabled = true",
			})

			if err2 != nil {
				ctx.AbortWithError(500, err2)
			}

			pluginsStatement := []string{}
			for _, plugin := range plugins {
				pluginsStatement = append(
					pluginsStatement,
					fmt.Sprintf(`{name: "%v", location: "/plugin-content/%v.js"},`, plugin.Name, plugin.UniqueId),
				)
			}

			indexContent := string(index)
			indexContent = strings.ReplaceAll(indexContent, "/* inject-plugins-array */", strings.Join(pluginsStatement, "\r\n"))
			ctx.Header("content-type", "text/html")
			ctx.String(200, indexContent)
		})
	},
	Modules: []*fireback.ModuleProvider{

		/*
			// Projects generated as microservice, will not include the following modules,
			// and that's all the difference between microservice and monolith in fireback

			abac.WorkspaceModuleSetup(),
			abac.DriveModuleSetup(),
			abac.NotificationModuleSetup(),
			abac.PassportsModuleSetup(),


		*/

		// Instead of few *ModuleSetup above, we are adding microservice module,
		// which essentially changes the Authorization resolver to allow everything,
		// and adds Capability* tables into the database.
		// You can uncomment the WorkspaceModuleSetup or other default Modules and go back to normal.
		fireback.FirebackModuleSetup(nil),

		// do not remove this comment line - it's used by fireback to append new modules
		plugin.PluginModuleSetup(nil),
	},
}

func main() {

	// This is an important setting for some kind of app which will be installed
	// it makes it easier for fireback to find the configuration.
	os.Setenv("PRODUCT_UNIQUE_NAME", PRODUCT_NAMESPACENAME)

	// This AppStart function is a wrapper for few things commonly can handle entire backend project
	// startup. For mobile or desktop might other functionality be used.
	xapp.CommonHeadlessAppStart(func() {
		// If anything needs to be done after database initialized
	})
}
