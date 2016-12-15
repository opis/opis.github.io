---
layout: project
permalink: closure/2.3/features
title: Features
description: Library features
---
# Features

1. [Resolve class names](#resolve-class-names)
2. [Resolve function and constant names](#resolve-functions-constants)
2. [PHP 7.0 support](#php-7-support)
3. [Resolve closure's scope and $this object](#resolve-scope-this)

## Resolve class names

All class names referenced by a closure are automatically resolved at serialization time, 
allowing you to write a cleaner code. 

```php
use Some\Namespace\SomeClass;
use Some\Namespace as X;
use Other\Namespace\SomeClass as OtherClass;

$closure = function(SomeClass $a, OtherClass $b, X\SomeClass $c){
    return [
        new X\SomeClass(),
        new SomeClass(),
        new OtherClass(),
    ];
};

//Class names are resolved
$closure = unserialize(serialize(new SerializableClosure($closure)))->getClosure();
```

## Resolve function and constant names
{:#resolve-functions-constants}

The library also supports referencing functions and constants.

```php
use function Some\Namespace\f;
use function Other\Namespace\f as a;
use const Some\Namespace\C;
use const Other\Namespace\C as U;

$closure = function(){
    f(U);
    a(C);
};

//Names are resolved
$closure = unserialize(serialize(new SerializableClosure($closure)))->getClosure();
```

## PHP 7.0 support
{:#php-7-support}

**Opis Closure** fully support the new PHP 7 syntax for `use` statements.

```php
use Some\Namespace{
    Class1,
    SubNamesace\Class2,
    Class3 as T
};
use function OtherNS{
    f1,
    Sub\f2 as function2
}

$closure = function(Class1 $a, Class2 $b, T $c){
    f1();
    function2();
};

//Names are resolved
$closure = unserialize(serialize(new SerializableClosure($closure)))->getClosure();
```

## Resolve closure's scope and $this object
{:#resolve-scope-this}

**Opis Closure** automatically detects when the scope and the `$this` object of a closure needs to be serialized 
in order for the closure to work properly after deserialization.

```php
use Opis\Closure\SerialiazbleClosure;

class A
{
    function a()
    {
        // scope & $this are not serialized
        serialize(new SerializableClosure(function(){
            echo 123;
        }));
    }
    
    function b()
    {
        // scope is serialized
        serialize(new SerializableClosure(function(){
            echo self::class;
        }));
    }
    
    function c()
    {
        // scope & $this are serialized
        serialize(new SerializableClosure(function(){
            $this->a();
        }));
    }
}
```

You can force the serialization of the `$this`
object by passing `true` as the second argument to the `SerialiazbleClosure` constructor 
or to the `SerialiazbleClosure::from` [method](context#the-from-method).

```php
use Opis\Closure\SerialiazbleClosure;

class A
{
    function d()
    {
        // scope & $this are serialized (forced)
        serialize(new SerializableClosure(function(){
            echo 123
        }, true));
        
        // scope & $this are serialized (forced)
        serialize(SerializableClosure::from(function(){
            echo 123
        }, true));
    }
}
```
