---
title: 'Ban Git Pull'
date: '2020-02-23'
---
Software development has mostly settled on git as the primary version control system. That’s great because it’s a flexible and powerful tool. It also sucks because it’s a cryptic and unintuitive program.

### Abstractions Leaking Everywhere
I believe it’s worth the time to learn exactly how git works internally. You can then make an informed decision about how exactly you want to use it. And when something goes wrong, you can reason about a possible solution. The necessity of learning the internal workings of a program to use said program is an obvious red flag. This is a too complex program that leaks its abstractions everywhere. And that’s entirely true of git. But we’re stuck with git for now. The best explanation I’ve found about how git works is Michael Schwern‘s talk *[Git for Ages 4 And Up](https://www.youtube.com/watch?v=1ffBJ4sVUb4)*. If you use git every day, it’s worth the roughly hour and a half of your time.

### Making Nice with Git
While everyone should decide for themselves how they like to manage their work, I’ll naively offer my method. As the title hinted at, I don’t like `git pull`. It’s a seemingly benign command to pull the latest changes from the remote repository into the local repository. But it’s a sneaky command that slips in two commands under one name. [The documentation](https://git-scm.com/docs/git-pull) states, “In its default mode, git pull is shorthand for git fetch followed by git merge FETCH_HEAD.” I have two problems with this. It’s not clear to users what commands are being executed (fetch AND merge) and I don’t like `git merge`.

The merits of merging or rebasing pull requests into the target branch is another argument and up to the people managing the repository. But I don’t see any reason to merge the target branch into your feature branch. Code moves from a feature branch into the target, not the other direction. So what do I do when I want to bring the latest code into my feature branch? Rebase, never merge.

### Commands
My general development process usually looks like this:

    # Get the latest changes from the server
    git fetch

    # Checkout the latest commit on main
    git checkout origin/main

    # Create and checkout my feature branch
    git checkout -b feature/foo

    # Make code changes

    # Commit changes to the local repository
    git commit

    # Sync branch with the remote repository
    git push --set-upstream origin feature/foo

If main has moved ahead of me during development I’ll get the latest changes and place my code on top of them:

    git fetch

    # Put my commits on top of main
    git rebase origin/main

    # Force push my branch to the server
    git push -f

A few things may stand out about this process:

1. I never run run `git merge` or `git pull`.
2. I never checkout a local version of main.
3. I force push my feature branch.


1. Pulls and merges are replaced by fetches and rebases. They don’t hide what they do and don’t reverse the direction of code from target branch to feature branch.
2. Never checking out the target branch (in this case main) removes so much complication around ensuring your local version is in sync with the server. In a pull request model, you never commit directly to main so there’s no reason to check it out.
3. When you play in the world of rebase, you must get comfortable with force pushes. They rewrite the history of past commits and cause problems when others are working from the same branch. But when it’s a branch you solely own, force push all day long.

### Aliases
I fetch and rebase onto the target branch at least once a day. Some of these commands are lengthy and make you wish for a GUI that abstracts the complexity away. But like I said before, git leaks its abstractions constantly which make the job of a git wrapper program difficult. I recommend sticking to the native git CLI but making extensive use of aliases. Here are a few of my favorites.

`alias g='git'`  
My most basic git alias may seem unnecessary and might be but it gives me a little joy every time I use it and slightly speeds up every other command.

`alias gfa='git fetch --all'`  
Get all the latest changes from all remote repositories.

`alias gco='git checkout origin/main'`  
Checkout the latest commit on the main branch.

`alias gro='git rebase origin/main'`  
Rebase onto the main branch.

### Stuck With Git
It’s unfortunate we got stuck with git. It’s hard to learn and has a lot of basic user interface issues. But it’s the tool we have so you might as well make it work for you.
