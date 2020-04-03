
# Pokédex Little

[Angular + NativeScript] demo application featuring [PokéAPI].

[DEMO.gif] **→ TODO**

## What's inside?

### Home

1. Lists Kanto Pokédex. [demo][home]
2. Filter pokemon by name. [demo][home]
3. Select a pokémon [demo][home]
   - Display pokémon details. [demo][home]

### Pokédex

1. Lists all 14 pokédexes. [demo][home]
2. Select one pokédex. [demo][home]
   -  Display all pokémon, filtered by selected selected pokédex. [demo][home]
      -  Filter pokemon by name. [demo][home]
      -  Select a pokémon. [demo][home]
         -  Display pokémon details. [demo][home]

### Pokémon

1. Lists all 18 pokémon types. [demo][pokemon]
2. Select one pokémon type. [demo][pokemon]
   -  Display all pokémon, filtered by selected type. [demo][pokemon]
      -  Filter pokemon by name.[demo][pokemon]
      -  Select a pokémon.[demo][pokemon]
         -  Display pokémon details.[demo][pokemon]

### Generation

1. Lists all 7 pokémon generations. [demo][pokemon]
2. Select one generation. [demo][pokemon]
   -  Display all pokémon, filtered by generation. [demo][pokemon]
      -  Filter pokemon by name. [demo][pokemon]
      -  Select a pokémon. [demo][pokemon]
         -  Display pokémon details. [demo][pokemon]

### Berries

1. Lists 64 kinds of berries [demo][pokemon]
2. Select a berry. [demo][pokemon]
    -  Display berry details [demo][pokemon]

### TODO

1. Pokemon moves.
2. Pokemon items.
3. Pokemon locations.
4. Add more details to sidebar.

## Plugins used

 | Plugin            | Author              | Package                        |
 | :---------------- | :------------------ | :----------------------------- |
 | [UI Sidedrawer]   | [NativeScript Team] | `nativescript-ui-sidedrawer`   |
 | [Material Ripple] | [farfromrefuge]     | `nativescript-material-ripple` |

## Components used

1. `Button`
2. `Image`
3. `ActionBar`
4. `NavigationButton`
5. `ListView`
6. `ScrollView`
7. `RadSideDrawer`
8. `MDRipple` (plugin)

## Layouts used

1. `GridLayout`
2. `StackLayout`
3. `FlexboxLayout`

## Development Specs

### App generated using Nativescript CLI version 6.5.0

- **Template:** [tns-template-blank-ng]
- **Target Platform:** Android only
- Nativescript v6.5.0
- Angular v9.0.7
- Angular CLI v8.2.0
- **OS:** Windows 10

### Emulator specs

- **Emulator:** Genymotion v3.0.4
- **Size:** 1440x2960
- **Density:** 560
- Android 9.0
- Android API 28

## Quick start

``` bash
> git clone https://github.com/ElecTreeFrying/pokedex-little.git
> cd pokedex-little
> npm install
> tns run android --env.uglify --env.aot
```

## Issues

TextField event, (textChange). Not working on device keyboard. #8494

Unable to change background color of ActionBar installed on a device. #8469

## Contributing

- Feel free to submit any pull requests. ✨✨✨
- Submit any issues, and feature requests in [GitHub Issues]. 🐹

## License

Apache License Version 2.0

[home]: https://
[pokedex]: https://
[pokemon]: https://
[generation]: https://
[berries]: https://

[Angular + NativeScript]: https://www.nativescript.org/nativescript-is-how-you-build-native-mobile-apps-with-angular
[PokéAPI]: https://pokeapi.co/

[IntelliSense and Access to the Native APIs via TypeScript]: https://docs.nativescript.org/core-concepts/accessing-native-apis-with-javascript#intellisense-and-access-to-the-native-apis-via-typescript

[UI Sidedrawer]: https://market.nativescript.org/plugins/nativescript-ui-sidedrawer
[Material Ripple]: https://market.nativescript.org/plugins/nativescript-material-ripple

[NativeScript Team]: https://market.nativescript.org/author/tns-bot
[farfromrefuge]: https://market.nativescript.org/author/farfromrefuge

[tns-template-blank-ng]: https://market.nativescript.org/plugins/tns-template-blank-ng

[GitHub Issues]: https://github.com/ElecTreeFrying/pokedex-little/issues
