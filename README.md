# NodeBB Awards

System for rewarding forum users. It allows admin to define set of awards that could be granted to users for special accomplishments. 

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->
 

- [How does it work?](#how-does-it-work)
- [Themes](#themes)
  - [Profile template](#profile-template)
- [TODO](#todo)
- [Changelog](#changelog)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## How does it work?

Plugin introduces new entity for your board: Award. It could be anything: ribbon, medal, special rank, etc.

1. Visit Awards control panel in ACP
2. Create several awards, don't forget images.
3. Give awards to the users.
4. If you want to list users' awards, you can augment Profile page template - `profile.tpl`

## Themes

### Profile template

Use profile partial, it will add small panel with awards as list. Every award item will include: picture, name, reason and date.

Example Vanilla Theme, edit `nodebb-theme-vanilla/templates/account/profile.tpl`:

    <!-- IMPORT partials/awards_profile.tpl -->

## TODO

- Add Sections to categorise awards, like: Forum, One time event, etc.
- Add User Manager: manager user's award - order, overview
- Add Notifications
- Edit Award image
- Use NodeBB's alerts (app.alert)
- ACP: Add Awarded Users statistics
- ACP: Improve Auto-complete component for users search - add keyboard handlers like esc, arrows
- Create Profile template with popovers (currently It is a list)
- Add Achievements section, where rules can be specified, and same Awards could be granted automatically (auto-awards with progress, Ex: `First 1000 posts -> Core Heart`, `Every 20 likes -> Lover`, etc)
- Add Tests (Mocha/Tape)
- Beautify `Create Award` panel
- Handle multiple awards of the same type (Exapmle: `medal x 8`)

## Changelog

### v1.0.0 - 06.05.2015

- Very first release