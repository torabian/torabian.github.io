package main

import (
	"github.com/myorg/mynewmicroservice/modules/product"

	"os"

	"github.com/gin-gonic/gin"

	"github.com/torabian/fireback/modules/fireback"
)

var PRODUCT_NAMESPACENAME = "fireback-microservice-boilerplate"
var PRODUCT_DESCRIPTION = "Fireback microservice boilerplate"
var PRODUCT_LANGUAGES = []string{"en"}

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
	PublicFolders:        []fireback.PublicFolderInfo{
		// You can set a series of static folders to be served along with fireback.
		// This is only for static content. For advanced MVX render templates, you need to
		// Bootstrap those themes
		// Add these two lines on the top of the file
		/////go:embed all:ui
		// var ui embed.FS
		// and then uncomment this, for example to serve static react or angular content
		// {Fs: &ui, Folder: "ui"},

	},
	SetupWebServerHook: func(e *gin.Engine, xs *fireback.FirebackApp) {

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
		product.ProductModuleSetup(nil),
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
