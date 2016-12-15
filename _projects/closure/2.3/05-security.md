---
layout: project
permalink: closure/2.3/security
title: Secured closures
description: Learn how to secure your closures
redirect_from: /closure/security.html
---
# Secured closures

While fetching and unserializing closures from a local file or from a local database,
that can not be accessed from outside is totally fine, there might be situations when
you will want to take some precautions before executing a closure. 

**Important!**{:.important}
All security related features described here 
are available starting with version 2.1.0 
{:.well .text-primary}

For example, if you are fetching serialized closures from a remote server,
you should definitely make sure that the closures were not altered on their way to your server. 
The simplest way of confirming a closure's authenticity is by using the 
`Opis\Closure\SecureClosure` class, which extends the `Opis\Closure\SerializableClosure` 
and provides cryptographically support for closures. 

In order to be able to use secure closures, you must first set a security provider, 
which must be an instance of a class implementing the `Opis\Closure\SecurityProviderInterface`. 
The library ships with a default security provider, implemented by the 
`Opis\Closure\DefaultSecurityProvider` class. 
Creating an instance of this class requires you to provide a secret key that 
will be used to cryptographically sign the closure. 
The same secret key will be used by the security provider to verify if a closure was altered or not. 

```php
use Opis\Closure\DefaultSecurityProvider;

$provider = new DefaultSecurityProvider('secret key');
```

Setting the security provider is done by using the `setSecurityProvider` 
static method of the `Opis\Closure\SecureClosure` class. 

```php
use Opis\Closure\SecureClosure;
use Opis\Closure\DefaultSecurityProvider;

$provider = new DefaultSecurityProvider('secret key');
SecureClosure::setSecurityProvider($provider);
```

Getting the currently used security provider is done by using the `getSecurityProvider`
static method of the same class. 
If a security provider was not set yet, the method returns `null`. 

```php
use Opis\Closure\SecureClosure;

// Some code here

$provider = SecureClosure::getSecurityProvider();
```

Once a security provider was set, you can start serialize and unserialze secured closures
just like you would do with normal closures, and if a closure's validation fails, 
then a `Opis\Colibri\SecurityException` exception will be thrown. 

**Important!**{:.important}
 You must make sure that the same security provider,
 with the same settings, is used both for serialization and unserialization. 
{:.well .text-primary}

```php
use Opis\Closure\SecureClosure;
use Opis\Closure\DefaultSecurityProvider;

$provider = new DefaultSecurityProvider('secret key');
SecureClosure::setSecurityProvider($provider);

// ...

$closure = function(){
    // ...  
};

// ...

$value = serialize(new SecureClosure($closure)); 
$closure = unserialize($value)->getClosure();
```

