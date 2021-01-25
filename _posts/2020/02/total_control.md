---
title: 'Total Control'
date: '2020-02-17'
---
This site has moved from GitHub Pages to a barebones, fully customizable cloud server. As of me writing this, the site is served from an nginx web server, routing to a custom Go application running on a Linux server. Unless you inspect the HTTP headers returned to your browser or inspect the TLS/SSL certificate of the site, you shouldn’t notice a difference.

But there is a difference. Besides running the hardware for the server (I’ll leave that to the experts for now), I have full control over all the software and configuration used to make the site functional. I can choose to swap out any part of the tech stack depending on my my needs or fancy. I can configure the nginx reverse proxy any way I’d like. I can use any language for my web server. By using a custom Go application, I can do any web request manipulation, logging, dynamic routing, etc., that I want.

I enjoy having this total control but won’t pretend it’s necessary. I like figuring stuff out and fiddling with different options and finding the “most, best” way to do something. And managing my own web server gives me the opportunity to just play and have fun. It’s most definitely less reliable than relying on a reputable web host to handle this all for me, but what’s the fun in that?