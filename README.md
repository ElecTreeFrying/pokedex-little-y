
# Pokédex Little

[Angular + NativeScript] demo application featuring [PokéAPI].

[DEMO.gif] **→ TODO**

## What's inside?

### Home

1. Lists entire national pokédex.
2. Select a pokémon

### Pokédex

1. Lists all 14 pokédexes.
2. Select a pokédex.
   -  Display all pokémon, filtered by selected selected pokédex.
      -  Select a pokémon.
         -  Display pokémon details. **→ TODO**

### Pokémon

1. Lists all 18 pokémon types.
2. Select one pokémon type.
   -  Display all pokémon, filtered by selected type .
      -  Select a pokémon.
         -  Display pokémon details. **→ TODO**

### Generation

1. Lists all 7 pokémon generations.
2. Select one generation.
   -  Display all pokémon, filtered by generation .
      -  Select a pokémon.
         -  Display pokémon details. **→ TODO**

### Berries

1. Lists 64 kinds of berries
2. Select one berry
    -  **→ TODO**

### Other features

1. **→ TODO**
2. **→ TODO**
3. **→ TODO**

## Plugins used

 | Plugin            | Author              | Package                        |
 | :---------------- | :------------------ | :----------------------------- |
 | [UI Sidedrawer]   | [NativeScript Team] | `nativescript-ui-sidedrawer`   |
 | [Material Ripple] | [farfromrefuge]     | `nativescript-material-ripple` |

## Components used

1. `Label`
6. `Button`
8. `Image`
2. `ActionBar`
3. `NavigationButton`
5. `ListView`
4. `ScrollView`
7. `RadSideDrawer`
9. `MDRipple` (plugin)

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

## Contributing

- Feel free to submit any pull requests. ✨✨✨
- Submit any issues, and feature requests in [GitHub Issues]. 🐹

## License

MIT

[Angular + NativeScript]: https://www.nativescript.org/nativescript-is-how-you-build-native-mobile-apps-with-angular
[PokéAPI]: https://pokeapi.co/

[IntelliSense and Access to the Native APIs via TypeScript]: https://docs.nativescript.org/core-concepts/accessing-native-apis-with-javascript#intellisense-and-access-to-the-native-apis-via-typescript

[UI Sidedrawer]: https://market.nativescript.org/plugins/nativescript-ui-sidedrawer
[Material Ripple]: https://market.nativescript.org/plugins/nativescript-material-ripple

[NativeScript Team]: https://market.nativescript.org/author/tns-bot
[farfromrefuge]: https://market.nativescript.org/author/farfromrefuge

[tns-template-blank-ng]: https://market.nativescript.org/plugins/tns-template-blank-ng

[GitHub Issues]: https://github.com/ElecTreeFrying/pokedex-little/issues