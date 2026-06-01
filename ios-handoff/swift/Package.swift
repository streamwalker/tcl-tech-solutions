// swift-tools-version: 6.0
import PackageDescription

let package = Package(
    name: "TCL",
    platforms: [.iOS(.v26)],
    products: [
        .library(name: "TCL", targets: ["TCL"])
    ],
    dependencies: [
        .package(url: "https://github.com/supabase/supabase-swift", from: "2.0.0"),
    ],
    targets: [
        .target(
            name: "TCL",
            dependencies: [
                .product(name: "Supabase", package: "supabase-swift")
            ]
        ),
        .testTarget(name: "TCLTests", dependencies: ["TCL"])
    ]
)
