This is the code for the Windows ports of Nimbus, using the [Electron](https://github.com/atom/electron) framework. When the application is opened, the current webpage at corbindavenport.github.io/nimbus is loaded. This avoids having to locally update the application with every release.

The installer is generated using the [NSIS](http://nsis.sourceforge.net/Download) Zip2Exe. Nimbus is installed to C:\ProgramData\Microsoft\Windows\Start Menu\Programs\Nimbus by default, but can be changed to another folder during install.

Nimbus currently targets the win32-ia32 and win32-x64 platforms, as supported by Electron. Future ports to Mac and Linux may come in the future as the Windows ports mature.