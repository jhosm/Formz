Formz [![Build Status](https://travis-ci.org/jhosm/Formz.png?branch=master)](https://travis-ci.org/jhosm/Formz) [![Dependency Status](https://gemnasium.com/jhosm/Formz.png)](https://gemnasium.com/jhosm/Formz)
================================================================================================================================================================================================================

**Important note:** Right now Formz is pretty much in its infancy and feature incomplete. Check [demo](http://jhosm.github.io/Formz/demo/release/app) 
site to check it's maturity.

Formz aims to build web forms based on Xml Schemas. We know that that data-driven web apps are not very flexible, 
so the main scenario is to facilitate the creation of GUI's to xml-based configuration files.

It is also a simple opportunity to learn about many interesting things:

* [Angular JS](http://angularjs.org/) - HTML enhanced for web apps.
* [karma](http://karma-runner.github.io) - Spectacular test runner for Javascript.
* [Node.js](http://nodejs.org) - Node.js is a platform built on Chrome's JavaScript runtime for easily building fast, scalable network applications. 
* [bower](http://bower.io/) - A package manager for the web, html, css and javascript
* [docker](http://jbt.github.io/docker/src/docker.js.html) - A simple documentation generator based on [docco](http://jashkenas.github.io/docco/).
* [grunt](http://gruntjs.com) - The Javascript task runner.
* [npm](http://npmjs.org) - Node.js package manager.
* [Travis CI](https://travis-ci.org) - Continuous integration in the cloud.
* [Vagrant](http://vagrantup.com) - Development environments made easy.
* [Ansible](http://ansible.cc) - Ansible is the easiest way to deploy, manage, and orchestrate computer systems you've ever seen, or so they say. ;)
* [Gemnasium](http://gemnasium.com) - Gemnasium is an online tool to monitor your project dependencies.

Read more about [Formz](http://jhosm.github.com/Formz/ "Formz docs").

Try the [demo](http://jhosm.github.io/Formz/demo/release/app) site, which relies on 
[house.xsd](http://jhosm.github.io/Formz/demo/release/app/xsd/house.xsd) and 
[human.xsd](http://jhosm.github.io/Formz/demo/release/app/xsd/human.xsd) to build the forms.

Getting Started
===============

Theses instructions only work for Unix-based machines. Follow them if you want to hack away.

Clone Formz repository:

	git clone git://github.com/jhosm/Formz.git

Install [Vagrant](http://vagrantup.com/ "Vagrant").

Install [ansible](http://ansible.cc/ "Ansible"), at least v1.2.

Create your vagrant machine:

	cd Formz
	vagrant up

Fire up karma for continuous unit test execution:
	
	vagrant ssh
	cd /vagrant
	sudo grunt unitTests

If you want to run the end-2-end (e2e) tests, do:
	
	vagrant ssh
	cd /vagrant
	sudo grunt e2eTests

Finally, if you want to run a simple webserver to host Formz, do:
	
	vagrant ssh
	cd /vagrant
	node scripts/web-server.js

Then browse to http://localhost:8080/ on your host machine.

Happy coding!