# 0x06. AirBnB clone - Web dynamic

## Description
This project is the 6th phase of developping and Airbnb clone as part of the ALX Software Engineering program in collaboration between Mahmoud Hammam and Youssef El Ghamour, aiming to replicate the functionality and user experience of the Airbnb platform.

The overall project incorporates Python, Object-Oriented Programming (OOP), SQL, and the SQLAlchemy ORM, integrates a static web page with HTML and CSS, populates it with data from the JSON storage or the MySQL database using  Flask, and dynamically generates content displayed on the web page using Jinja templates with JavaScript's JQuery Ajax. The project also contains Bash and Puppet scripts to automate the deployment of content to the Web Servers.

## Previous versions

This version V4 is forked from [jzamora5/AirBnB_clone_v3](https://github.com/jzamora5/AirBnB_clone_v3), and incorporates our web_dynamic enhancements. You can access our original previous versions below:
* [AirBnB_clone - Mahmoud Hammam](https://github.com/MahmoudHammam0/AirBnB_clone): The Console + Web Static
* [AirBnB_clone - Youssef El Ghamour](https://github.com/youssefelghamour/AirBnB_clone): The Console + Web Static
* [AirBnB_clone_v2 - Mahmoud Hammam](https://github.com/MahmoudHammam0/AirBnB_clone_v2): MySQL + Flask Web Framework + Web Deployement
* [AirBnB_clone_v2 - Youssef El Ghamour](https://github.com/youssefelghamour/AirBnB_clone_v2): MySQL + Flask Web Framework + Web Deployement
* [AirBnB_clone_v3](https://github.com/MahmoudHammam0/AirBnB_clone_v3): RESTful API

## Command Interpreter
The command interpreter allows users to interact with the AirBnB objects by performing various operations, including creating new objects, retrieving objects from files or databases, updating attributes, and more.

## How to start it:
* Clone this repository: `git clone "https://github.com/youssefelghamour/AirBnB_clone_v4.git"`
* Access the AirBnb directory: `cd AirBnB_clone_v4`
* Run hbnb (interactively): `./console` and enter command
* Run hbnb (non-interactively): `echo "<command>" | ./console.py`

### How to use it in:
#### Interactive mode
```
vagrantAirBnB_clone$./console.py
(hbnb) help

Documented commands (type help <topic>):
========================================
EOF  all  create  destroy  help  quit  show  update

(hbnb) all MyModel
** class doesn't exist **
(hbnb) create BaseModel
7da56403-cc45-4f1c-ad32-bfafeb2bb050
(hbnb) all BaseModel
[[BaseModel] (7da56403-cc45-4f1c-ad32-bfafeb2bb050) {'updated_at': datetime.datetime(2017, 9, 28, 9, 50, 46, 772167), 'id': '7da56403-cc45-4f1c-ad32-bfafeb2bb050', 'created_at': datetime.datetime(2017, 9, 28, 9, 50, 46, 772123)}]
(hbnb) show BaseModel 7da56403-cc45-4f1c-ad32-bfafeb2bb050
[BaseModel] (7da56403-cc45-4f1c-ad32-bfafeb2bb050) {'updated_at': datetime.datetime(2017, 9, 28, 9, 50, 46, 772167), 'id': '7da56403-cc45-4f1c-ad32-bfafeb2bb050', 'created_at': datetime.datetime(2017, 9, 28, 9, 50, 46, 772123)}
(hbnb) destroy BaseModel 7da56403-cc45-4f1c-ad32-bfafeb2bb050
(hbnb) show BaseModel 7da56403-cc45-4f1c-ad32-bfafeb2bb050
** no instance found **
(hbnb) quit
```

#### Non-interactive mode
```bash
$ echo "help" | ./console.py
(hbnb)

Documented commands (type help <topic>):
========================================
EOF  help  quit
(hbnb)
$
$ cat test_help
help
$
$ cat test_help | ./console.py
(hbnb)

Documented commands (type help <topic>):
========================================
EOF  help  quit
(hbnb)
$
```

## File Structure
- **[api](api)** directory contains Flask web applications for a RESTful API
- **[models](models)** directory contains all classes used for this project:
- **[tests](tests)** directory contains all unit test cases for this project.
- **[web_dynamic](web_dynamic)** directory contains all files necessary to start a dynamic Flask web application.
- **[web_flask](web_flask)** directory contains all files necessary to start a Flask web application.
- **[web_static](web_static)** directory contains all html, css and images used for the static website.
- [0-setup_web_static.sh](0-setup_web_static.sh) - bash script that sets up web servers for the deployment of `web_static`
- [1-pack_web_static.py](1-pack_web_static.py) - Fabric script that generates a .tgz archive from the contents of `web_static`, using the function `do_pack`
- [2-do_deploy_web_static.py](2-do_deploy_web_static.py) - Fabric script (based on [1-pack_web_static.py](1-pack_web_static.py)) that distributes an archive to web servers, using the function `do_deploy`
- [3-deploy_web_static.py](3-deploy_web_static.py) - Fabric script (based on [2-do_deploy_web_static.py](2-do_deploy_web_static.py)) that creates and distributes an archive to web servers, using the function `deploy`
- [AUTHORS](AUTHORS) - list of Authors who have worked on this project.
- [console.py](console.py) - the console is a command line used to interact with the storage engines. 
- [setup_mysql_dev.sql](setup_mysql_dev.sql) - MySQL script to set-up the hbnb_dev_db database.
- [setup_mysql_test.sql](setup_mysql_test.sql) - MySQL script to set-up the hbnb_test_db database.

## Bugs
No known bugs at this time. 

## Authors
Alexa Orrico - [Github](https://github.com/alexaorrico) / [Twitter](https://twitter.com/alexa_orrico)  
Jennifer Huang - [Github](https://github.com/jhuang10123) / [Twitter](https://twitter.com/earthtojhuang)  
Jhoan Zamora - [Github](https://github.com/jzamora5) / [Twitter](https://twitter.com/JhoanZamora10)  
David Ovalle - [Github](https://github.com/Nukemenonai) / [Twitter](https://twitter.com/disartDave)

Mahmoud Hammam - [Github](https://github.com/MahmoudHammam0)

Youssef El Ghamour - [Github](https://github.com/youssefelghamour)

## License
Public Domain. No copy write protection. 
