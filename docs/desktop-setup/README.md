_Last Edited: March 10, 2020_

# The Problem

Rebuilding my machine actually isn't a HUGE deal for me. It's something I do a few times a year...unless I'm having a very unlucky year. However, it IS something I've never done very well.

My experience almost always goes something like...

1. Reinstall the OS (usually Windows), formatting all the drives.
2. Install VSCode.
3. Stare at the screen wondering how had I gotten to the most perfect setup that had ever existed and that I loved...that I just wiped out.

# The ~~Solution~~ Improvement

Automation. The next time you redo your machine, make notes on what you install. And by notes, I mean, copy the install commands you're running into an executable file.

My now ever-evolving example is here: [Travis' Super Amazing Desktop Setup](https://github.com/tmerkel/desktop-setup)

Let's take a look at some of the current pieces...

## The Pre-Req Script

As I've said, I run Windows. But...I've grown fond of [Windows Subsystem for Linux](https://docs.microsoft.com/en-us/windows/wsl/wsl2-index). Which requires some features to be enabled. Which then require a restart.

To deal with these, I've created a [pre-req script](https://github.com/tmerkel/desktop-setup/blob/master/win-setup-pre.ps1).

The purpose of this script is to be the place where you add in all the things that need to be installed/setup before you can install the things you want to install.

Thus far...mine is pretty simple:

```powershell
# Enable WSL
Write-Host "Enabling Windows Subsystem for Linux..." -ForegroundColor Blue
Enable-WindowsOptionalFeature -NoRestart -Online -FeatureName Microsoft-Windows-Subsystem-Linux

# Enable Virtual Machine Platform
Write-Host "Enabling Virtual Machine Platform..." -ForegroundColor Blue
Enable-WindowsOptionalFeature -NoRestart -Online -FeatureName VirtualMachinePlatform

Write-Host "Finished installing pre-requisites.  Please restart." -ForegroundColor Green
```

## The Install

After I've restarted...I just run my [install script](https://github.com/tmerkel/desktop-setup/blob/master/win-setup.ps1).

This starts off by installing [Chocolatey](https://chocolatey.org/) to deal with package management.

```powershell
Log-Header "Installing Chocolately..."
Set-ExecutionPolicy Bypass -Scope Process -Force; iex ((New-Object System.Net.WebClient).DownloadString('https://chocolatey.org/install.ps1'))
```

And then, as stated previously, every other install I run to set up a machine is pasted in after...mostly. I forget things sometimes...

Make sure to remember that it's not just software that goes here. Configuration is part of setup. Things like adding in all the extensions you like to VSCode...

```powershell
Log-Header "Installing VSCode Extensions..."

code --install-extension "ms-vscode.csharp"
code --install-extension "msjsdiag.debugger-for-chrome"
code --install-extension "ms-vscode.powershell"
code --install-extension "esbenp.prettier-vscode"
code --install-extension "ms-vscode.vscode-typescript-tslint-plugin"
code --install-extension "christian-kohler.npm-intellisense"
code --install-extension "eg2.vscode-npm-script"
code --install-extension "sdras.night-owl"
code --install-extension "ms-vscode-remote.vscode-remote-extensionpack"
code --install-extension "ms-vscode-remote.remote-wsl"
code --install-extension "octref.vetur"
code --install-extension "ms-azuretools.vscode-docker"
code --install-extension "humao.rest-client"
```

Or setting your browser(s) to use the right search engine...I'm actually still working on that one...

## The Sub...Scripts?

Break up the installs where it makes sense. Setting up things _within_ WSL is kind of it's own thing. Thus, I have a [separate script](https://github.com/tmerkel/desktop-setup/blob/master/wsl-setup.bash) for that...

```bash
nvm install --lts
sudo apt update && sudo apt upgrade
sudo apt install build-essential
sudo apt install awscli

echo "Installing kubectl..."
curl -LO https://storage.googleapis.com/kubernetes-release/release/`curl -s https://storage.googleapis.com/kubernetes-release/release/stable.txt`/bin/linux/amd64/kubectl
chmod +x ./kubectl
sudo mv ./kubectl /usr/local/bin/kubectl

echo "export AWS_CONFIG_FILE='C:\Users\tmerk\.aws\config'
export AWS_SHARED_CREDENTIALS_FILE='C:\Users\tmerk\.aws\credentials'

alias k=kubectl" >> ~/.bashrc
```

Maybe you're running WSL on Windows like me and like this set up. Maybe you prefer to break your scripts into separate "install+configure" scripts for each program or tool you use. Do whatever makes the most sense for you.

## The Outcome

If you do this, hopefully your next install experience is...better. Probably it won't be perfect. At the time of this writing, I have to run my script twice to get everything installed because something conflicts with something else and I have no time...

But...something is better than nothing. You can get 90% setup and then try and remember the two new things you forgot to add, rather than just staring at a fresh install in terror.

An added benefit to this is, when your friend/coworker asks you what cool tools you use for X...you can just point them to your scripts.
