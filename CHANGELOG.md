# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [5.2.0] - 2019-06-04

- Added restriction to work with Node v6 and higher
- Changed version compatibility with NodeBB v1.12.0
- Fixed handling of purged posts
- Security updated to ACP dependencies to prevent critical vulnerabilities 

## [5.1.0] - 2018-12-24

- Changed all core dependencies to use the latest secure versions
- Changed ACP Management layout to take all available width
- Fixed NodeBB database requests without a limit (kudos to Marek Dorda) 

## [5.0.1] - 2018-11-29

- Changed compatibility with NodeBB to enforce version compatibility to v1.11.0 only

## [5.0.0] - 2018-11-29

- Changed compatibility with NodeBB v1.11.x
- Removed NodeBB Core emitter dependency

## [4.0.0] - 2017-07-22

- Added an edit mode for multiple awards
- Added support for plugin driven image upload
- Added ACP Rewards page
- Added protection for an image upload service
- Added activity limit setting
- Added configuration for notification text
- Added reward multiplier for overview page
- Added external Plugin API
- Added tooltips to a topic view
- Added support for SVG
- Changed user experience for the creation of awards
- Changed user experience for ACP Overview page
- Changed award URL to use an absolute path
- Changed award upload
- Changed compatibility with NodeBB v1.5.x
- Changed notifications
- Changed max rewards per post setting
- Changed max rewards per account setting
- Changed ACP Overview page styles to use Flexbox
- Changed code dependencies
- Changed ACP dependencies
- Removed extended profile template

## [3.0.0] - 2016-03-16

- Added error messages for new awards uploads
- Changed compatibility with NodeBB v1.x.x
- Changed award uploading to use relative path

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
