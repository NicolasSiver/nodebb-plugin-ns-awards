# NodeBB Awards

A system for rewarding forum users. The plugin allows admin to define set of awards that could be granted to users for special accomplishments.

![Version](https://img.shields.io/npm/v/nodebb-plugin-ns-awards.svg)
![Dependencies](https://david-dm.org/NicolasSiver/nodebb-plugin-ns-awards.svg)
[![bitHound Score](https://www.bithound.io/github/NicolasSiver/nodebb-plugin-ns-awards/badges/score.svg?)](https://www.bithound.io/github/NicolasSiver/nodebb-plugin-ns-awards)
![Code Climate](https://img.shields.io/codeclimate/github/NicolasSiver/nodebb-plugin-ns-awards.svg)

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
 

- [How does it work?](#how-does-it-work)
- [ACP Look](#acp-look)
- [Themes](#themes)
  - [Profile template](#profile-template)
  - [Topic template](#topic-template)
- [Filters](#filters)
- [Styling](#styling)
- [TODO](#todo)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## How does it work?

Plugin introduces new entity for your board: Award. It could be anything: ribbon, medal, special rank, etc.

1. Visit Awards control panel in ACP
2. Create several awards, don't forget images.
3. Give awards to the users.
4. If you want to list users' awards, you can augment Profile page template - `profile.tpl`

## ACP Look

![Admin Panel View](screenshot.png)

## Themes

### Profile template

Use flex template - `awards_profile_flex.tpl` for Persona v4. Place it wherever you like.

```html
<!-- IMPORT partials/awards_profile_flex.tpl -->
```

Use profile partial, it will add small panel with awards as list. Every award item will include: picture, name, reason and date.

Example Vanilla Theme, edit `node_modules/nodebb-theme-vanilla/templates/account/profile.tpl`:

    <!-- IMPORT partials/awards_profile.tpl -->
    
### Topic template

Use topic partial to show awards for every post. Award's metadata is the same as for Profile template.

Example Persona Theme, edit `node_modules/nodebb-theme-persona/templates/partials/topic/post.tpl`:

    <!-- IMPORT partials/awards_topic.tpl -->

## Filters

The plugin injects rewards to the several places. It could be useful for theme enthusiasts. 
It's possible to configure a limit or disable a feature in the settings.

- Posts. Every post will have a new property `nsRewards` with a list of rewards.
- Account. Every account will have a new property `nsRewards` with a list of rewards.

## Styling

The overview page is based on Flexbox with simple CSS class name set. 
Also, all layout is based on em values.

Key CSS Classes:

- `ns-awards-overview__item`, container for the list item
- `ns-awards-overview__image`, since award image is responsive, it's possible to adjust a width of image container
- `ns-awards-overview__users`, list of the awarded users

## TODO

- Add Plugin API: grant award. Introduce tokens.
- Add support for SVG
- Add Sections to categorise awards, like: Forum, One time event, etc.
- Manage: ability to change order of awards
- ACP: Add Awarded Users statistics
- Add Achievements section, where rules can be specified, and same Awards could be granted automatically (auto-awards with progress, Ex: `First 1000 posts -> Core Heart`, `Every 20 likes -> Lover`, etc)
- Add Tests (Mocha/Tape)
- Handle multiple awards of the same type (Exapmle: `medal x 8`)
- Topic View: use Bootstrap tooltips
- Settings for CSS classes in topic view
