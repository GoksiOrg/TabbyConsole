FROM php:8.1-apache

RUN apt-get update && \
    apt-get install -y mariadb-client git zip unzip libxml2-dev libzip-dev && \
    apt-get clean


RUN docker-php-ext-install pdo_mysql soap zip && \
    pecl install -o -f redis && \
    docker-php-ext-enable redis && \
    pecl install -o -f xdebug-3.1.6 && \
    docker-php-ext-enable xdebug && \
    rm -rf /tmp/pear

RUN echo "# https://xdebug.org/docs/all_settings#mode" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini
RUN echo "xdebug.mode=develop,coverage,debug" >> /usr/local/etc/php/conf.d/docker-php-ext-xdebug.ini

RUN curl https://getcomposer.org/installer > composer-setup.php
RUN php composer-setup.php
RUN mv composer.phar /usr/local/bin/composer
RUN rm composer-setup.php

ADD ./apache.conf /etc/apache2/sites-available/
RUN ln -s /etc/apache2/sites-available/apache.conf /etc/apache2/sites-enabled/
RUN rm /etc/apache2/sites-enabled/000-default.conf
RUN a2enmod rewrite
RUN a2enmod ssl

ADD certs /var/www/certs/

COPY apache.sh /apache.sh
COPY entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
CMD ["/apache.sh"]
