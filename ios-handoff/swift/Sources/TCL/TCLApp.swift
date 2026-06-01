import SwiftUI

@main
struct TCLApp: App {
    var body: some Scene {
        WindowGroup {
            RootView()
                .preferredColorScheme(.dark)
        }
    }
}

struct RootView: View {
    var body: some View {
        TabView {
            Text("Home").tabItem { Label("Home", systemImage: "house") }
            Text("Products").tabItem { Label("Products", systemImage: "shippingbox") }
            Text("Academy").tabItem { Label("Academy", systemImage: "graduationcap") }
            Text("Platform").tabItem { Label("Platform", systemImage: "square.grid.2x2") }
            Text("Account").tabItem { Label("Account", systemImage: "person.crop.circle") }
        }
    }
}
