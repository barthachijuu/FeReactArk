# Apache Configurations

This architecture includes an `app/.htaccess` file that does many things for you:

1. Redirect all traffic to HTTPS because ServiceWorker only works for encrypted
    traffic.
2. Rewrite all pages (e.g. `yourdomain.com/subpage`) to `yourdomain.com/index.html`
    to let `react-router` take care of presenting the correct page.
3. Ensure that sw.js is not cached. This is required for updates to be downloaded in offline-first mode.
4. Ensure all the other files has an expiration cache.
5. Ensure all the compressed content are handling correctly

> Note: For performance reasons you should probably adapt this to run as a static
> `.conf` file (typically under `/etc/apache2/sites-enabled` or similar) so that
> your server doesn't have to apply these rules dynamically per request)

You can add any other part of configuration you want, if are confident with web server.

## Security

`.htaccess` can only provide security by redirecting HTTP to HTTPS

> Note: For a detailed security configuration in apache httpd, a `.conf` file is necessary.
> You can use [Mozilla's TLS Configurator](https://mozilla.github.io/server-side-tls/ssl-config-generator/) to get some examples.
