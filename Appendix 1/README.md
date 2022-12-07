# Appendix 1 - Mac users

After installing mariadb using brew, you will have to run a few commands to gain access to the database:

1. `sudo mysql -u root -p`, you will be prompted for a computer password then a database password, the database password should be `password`.
2. You should be in a mariadb shell now, perform the following:

```mysql 
GRANT ALL PRIVILEGES on *.* to 'root'@'localhost' IDENTIFIED BY 'password';
```

3. Now flush those priviliges as good practice: 

```mysql
FLUSH PRIVILEGES;
```

4. Restart mariadb for your changes to take effect: 

```bash
brew services restart mariadb
```
