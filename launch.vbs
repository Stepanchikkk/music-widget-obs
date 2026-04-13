Set WshShell = CreateObject("WScript.Shell")
WshShell.Run "node.exe """ & CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName) & "\server.js""", 0, False
Set WshShell = Nothing
