package main

import (
	"github.com/myorg/mynewbackend/modules/pkp-info"

	"os"

	"github.com/gin-gonic/gin"

	"github.com/myorg/mynewbackend/cmd/pkp/menu"

	telegram "github.com/myorg/mynewbackend/modules/telegram-bot"
	"github.com/torabian/fireback/modules/fireback"

	"github.com/torabian/fireback/modules/abac"

	FBManage "github.com/torabian/fireback/modules/fireback/codegen/fireback-manage"

	"embed"
)

var PRODUCT_NAMESPACENAME = "fireback-boilerplate"
var PRODUCT_DESCRIPTION = "Boilerplate for new go project using fireback"
var PRODUCT_LANGUAGES = []string{"en"}

//go:embed all:ui
var ui embed.FS

var xapp = &fireback.FirebackApp{
	Title: PRODUCT_DESCRIPTION,

	SupportedLanguages: PRODUCT_LANGUAGES,
	SearchProviders: []fireback.SearchProviderFn{

		abac.QueryMenusReact,
		abac.QueryRolesReact,
	},
	SeedersSync: func() {

		// Sample menu item to make it easier for demos
		abac.AppMenuSyncSeederFromFs(&menu.Menu, []string{"new-menu.yml"}, fireback.QueryDSL{
			WorkspaceId: "system",
		})

	},

	PublicFolders: []fireback.PublicFolderInfo{
		// You can set a series of static folders to be served along with fireback.
		// This is only for static content. For advanced MVX render templates, you need to
		// Bootstrap those themes
		// Add these two lines on the top of the file
		/////go:embed all:ui
		// var ui embed.FS
		// and then uncomment this, for example to serve static react or angular content
		// {Fs: &ui, Folder: "ui"},

		{Fs: &ui, Folder: "ui"},

		// You can change the Prefix to something else for more security,
		// or make it only available internally over vpn
		{Fs: &FBManage.FirebackManageTmpl, Folder: ".", Prefix: "/manage"},
	},
	SetupWebServerHook: func(e *gin.Engine, xs *fireback.FirebackApp) {

		go telegram.Start()
	},
	Modules: []*fireback.ModuleProvider{

		abac.WorkspaceModuleSetup(),
		abac.DriveModuleSetup(),
		abac.NotificationModuleSetup(),
		abac.PassportsModuleSetup(),

		// do not remove this comment line - it's used by fireback to append new modules
		pkp-info.Pkp-infoModuleSetup(nil),

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
