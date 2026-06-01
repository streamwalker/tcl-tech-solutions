# Swift project structure

```
app/                       # Xcode project (created by Claude Code)
  TCL.xcodeproj
  TCL/
    TCLApp.swift           # @main, sets up SupabaseClient + RootView
    RootView.swift         # TabView
    Theme/
      TCLColor.swift
      TCLFont.swift
      TCLCard.swift
      ButtonStyles.swift
    Navigation/
      Router.swift
      DeepLink.swift
    Backend/
      SupabaseClient+TCL.swift
      Auth/
      Repos/                # one per table: ClientsRepo, ProjectsRepo, ...
      EdgeFunctions/        # submit-final-exam, platform-agent, delete-account, ...
    Features/
      Home/
      URCBridge/
      Academy/
      Platform/
      Account/
      Press/
      Knowledge/
      Glossary/
      BusinessPlan/
      CapitalStack/
      BuilderDeck/
      Education/
      OmniCode/
      JoshAITutorial/
      Compliance/
      Legal/
    Shared/
      Markdown/             # MiniMarkdown port -> AttributedString
      Charts/
      Forms/
    Resources/
      Assets.xcassets
      Fonts/                # PlayfairDisplay, DMSans, DMMono
      Localizable.xcstrings
  TCLTests/
  TCLUITests/
  TCLAppClip/               # optional: URC Bridge lead form
```

Use one Swift file per public type. ViewModels are `@Observable` (iOS 26 / Swift 6 concurrency-safe).
