# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.1.0] - 2018-12-24

- Changed all core dependencies to use the latest secure versions
- Changed ACP Management layout to take all available width
- Fixed NodeBB database requests without a limit (kudos to Marek Dorda) 

## [5.0.1] - 2018-11-29

- Changed NodeBB compatibility to enforce version compatibility to v1.11.0 only

## [5.0.0] - 2018-11-29

- Changed to be compatible with NodeBB v1.11.0
- Removed NodeBB Core Emitter dependency

## [4.0.0] - 2017-07-22

- Add an edit mode for multiple awards
- Add support for plugin driven image upload
- Add rewards section to ACP
- Add protection for an image upload service
- Add activity limit setting
- Add configuration for notification text
- Add reward multiplier for overview page
- Add external Plugin API
- Add tooltips to a topic view
- Add support for SVG
- Change UX for the creation of awards
- Change UX for Overview section
- Change award URL to use an absolute path
- Change award upload
- Change NodeBB compatibility to v1.5.x and higher
- Change notifications
- Change max rewards per post setting
- Change max rewards per account setting
- Change overview page styles to use Flexbox
- Update plugin dependencies
- Update ACP dependencies
- Remove extended profile template

## [3.0.0] - 2016-03-16

- Compatibility with NodeBB v1.x
- Use of relative path for award uploading
- Show error messages for new awards uploads

## [2.1.0] - 2016-01-02

- Added ACP Manage section with an ability to reward multiple users and manage user's awards
- Changed user delete hook to `static:user.delete`
- Changed autocomplete component to clear search results
- Changed ACP dependencies
- Fixed an issue with a limit when user is deleted

## [2.0.1] - 2015-12-15

- Changed user search to work with only 2 characters

## [2.0.0] - 2015-12-09

- Added new flex template for the profile import
- Changed compatibility with NodeBB v0.9.x
- Changed ACP UI completely
- Changed image upload component

## [1.3.1] - 2015-09-21

- Changed upload script

## [1.3.0] - 2015-09-20

- Added notifications for the granted awards
- Changed autocomplete widget to make selection easier
- Changed ACP UI to adapt for NodeBB v0.8.x colors and layout

## [1.2.0] - 2015-05-12

- Added ACP Settings page
- Added rendering hooks for awards to be available in topic view
- Added new settings fields for topic rendering and max awards per topic

## [1.1.0] - 2015-05-10

- Added ability to edit award image
- Removed debug script from admin panel

## [1.0.1] - 2015-05-08

- Changed ACP to use RequireJS

## [1.0.0] - 2015-05-06

- Added the very first release
