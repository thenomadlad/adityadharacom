---
title: "Hack of the week - Obsidian archiver plugin"
description: "Experiments with buliding an obsidian plugin"
pubDate: "Sept 29 2023"
heroImage: "/blog/hotw-001-obsidian-archiver-plugin/demo_grouped.gif"
---

# Hack of the week - note archiver

I use obsidian for note taking and I thought it'd be a good idea to create an archive folder for notes that aren't relevant anymore. Manually moving files to an archive folder was tedious, so I wanted to script it. A simple python script worked but I thought why not try my hand at making a plugin

## Problem

I have notes in a few folders, and when I have one open on executing a command I want to move them to an archive folder but preserve the folder structure

```
Archive/
  Notes/
    2023-09-04.md
  Projects/
    old-ideas.md

Notes/
  2023-09-05.md
  2023-09-06.md
Projects/
  ideas.md
```

## Building it out

The documentation for [obsidian](https://docs.obsidian.md/Home) had a thorough workflow for creating a plugin and playing with it. I created a sample vault with a few notes and started testing out the idea.

### Step 1: Forking the sample repo and trying it out

Just as their tutorial said to, I created a fork of the sample repo: https://github.com/obsidianmd/obsidian-sample-plugin and went through their example code. There were samples for hooking into various UI elements, including dropdown menus and the command pallette

A little poking around helps get ideas on what can be built. There were also steps to test out a plugin under development (and I'd highly recommend the hot reload option) in this page [here](https://docs.obsidian.md/Plugins/Getting+started/Development+workflow) 

### Step 2: Building the UI

I decided to start simple and build out some UI elements that archive a file without any subfolder structure or sophisticated grouping mechanism. This helped me test out the UX of the elements I was building out before adding any more complications. I sketched out this UX and built it out using the sample code in the forked repo:

![UX for archive action](/blog/hotw-001-obsidian-archiver-plugin/commands_and_menu_items.png)

### Step 3: Trying it for a while and thinking of complications

I realized as I was playing around with the sample obsidian vault that it would be nice to group notes by the month or year the note was archived. This helps with organization so that I can also keep track of when I moved files. It also serves to manage duplicates - if I created a file with the same name in the months of may and june, when I archive it without grouping by archive date, the second file overwrites the first. Grouping my archived files by month also mitigates that (obviously as long as I dont create a duplicate in the same month)

I created a settings page with which you could decide if and how to group your archived notes:

![Settings page for grouping](/blog/hotw-001-obsidian-archiver-plugin/demo_grouped.gif)

### Step 4: posting for publishing, fixing some bugs from feedback

The steps for publishing include contributing to a list in a json file: https://docs.obsidian.md/Plugins/Releasing/Submit+your+plugin#Step+3+Submit+your+plugin+for+review

This was the most painful part because I was not the only plugin trying to get published and the file I needed to contribute to kept changing

### Step 5: Getting help for errors and feedback

I needed help to iron out a few bugs: I didn't realize the fs module was a nodejs-specific module, and nodejs isn't necessarily available when running obsidian (eg. on a phone). I receieved that as feedback in my merge request to publish my plugin

I also joined the discord group to further learn about how obsidian plugin development works. Reaching out to my reviewer and seeing other developers ask questions helped get some perspective on the development process

### Step 6: Finally getting the plugin published

After I received feedback and approval (and finding a time when I can merge in my changes to the file listing community plugin), I finally merged in my changes found my plugin in the marketplace

## Next steps

I've been dogfooding my plugin for a while, I think the only new feature I have as improvement is to configure the grouping by folder - perhaps I'd like to group the daily notes by month, but only group my goals notes by year. Since I've added a version field on the data type used for storing settings about the plugin, this is something I can easily do - create a newer version which contains a map of settings for each path

If you do have a suggestion for the plugin please add an issue in the repo for the plugin [here](https://github.com/thenomadlad/obsidian-note-archiver)!