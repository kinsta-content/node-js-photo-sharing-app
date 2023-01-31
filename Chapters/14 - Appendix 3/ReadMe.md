# Appendix 3: Installing MariaDB on Windows

To install MariaDB on a Windows computer, you can follow these steps:

- Download the MariaDB installer for Windows from the official website.
- Run the installer by double-clicking on the downloaded file.
- Select the language for the installer and click "OK".
- Click "Next" on the welcome screen.
- Read and accept the license agreement, then click "Next".
- Select the components you want to install. You can choose to install the MariaDB server, client tools, and/or the documentation. Click "Next" when you're ready to continue.
- Choose the location where you want to install MariaDB, and click "Next".
- Enter the password for the MariaDB root user, and click "Next".
- Select the type of configuration you want to use. You can choose between a "Developer Machine" or a "Server" configuration. Click "Next" when you're ready to continue.
- Click "Execute" to begin the installation process.
- Once the installation is complete, click "Finish" to exit the installer.

After installation, you can access the MariaDB command line client by opening a Command Prompt window and typing the command below then entering your root password when prompted.

`mysql -u root -p`

You can also use a GUI client like [MySQL Workbench](https://www.mysql.com/products/workbench/) to connect to the MariaDB server and manage it.

It's worth noting that, depending on your system's security settings, you may need to run the installer and the Command Prompt as an administrator.

## A Frequent Question

### When I try to run mysql in the command line, why do I get a 'not recognized as an internal or external command, operable program or batch file message'?

This error message is indicating that the command you are trying to run, "mysql", is not recognized as a valid command by your operating system. This can happen for a few different reasons.

- The MySQL client is not installed on your computer: In order to run the mysql command, you need to have the MySQL client software installed on your computer. If you don't have it installed, you will need to download and install it before you can run the command.
- MySQL client is not in your system's PATH: The PATH is a list of directories that your operating system searches when looking for executables. If the MySQL client is not in one of the directories in your PATH, the operating system will not be able to find it. You will need to add the directory containing the mysql executable to your PATH.
- MySQL service is not running: Even if the MySQL client software is installed and in your PATH, you will not be able to run the mysql command if the MySQL service is not running. You will need to start the MySQL service before you can run the command.
- Typo mistake: Make sure you are not typing any extra or wrong characters, also check the case sensitivity if you are on Linux or MacOS
- It's also possible that you might have multiple versions of MySQL installed and the one you are trying to run is not the one that is currently active.

Try running the command "mysqld --version" or "mysql --version" to check the version of mysql that you have installed on your computer, and ensure it is the one you want to use.
