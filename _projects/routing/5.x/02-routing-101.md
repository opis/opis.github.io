---
layout: project
permalink: routing/5.x/routing-101
title: Opis Routing 101
description: Learn how Opis Routing works
---
# Opis Routing 101

1. [Introduction](#introduction)
2. [Tags and segments](#tags-and-segments)
3. [Compiler's methods](#compilers-methods)
4. [Capture mode](#capture-mode)

## Introduction

The first step into building a routing system is to decide over the structure of the paths you want to handle and
find a pattern for that structure. 

```php
// File path pattern
$a = '/a/b/c';

// Host name pattern
$b = 'subdomain.example.com';

// Custom pattern
$c = 'a, b, c';
```

Once you have established the structure of your paths, and found a pattern, is time to move forward and create a 
compiler that can understand a given pattern and is able to transform it into a regex rule that can be matched against 
an arbitrary path.

The compiler is represented by an instance of `Opis\Routing\Compiler` class and takes as an argument 
an optional configuration array which tells what kind of patterns the compiler will understand and how it will 
handle them. If no configuration array is provided, then the following setup is assumed:

```php
use Opis\Routing\Compiler;

$compiler = new Compiler([
    Compiler::CAPTURE_MODE => Compiler::STANDARD_MODE, 
    Compiler::START_TAG_MARKER => '{',
    Compiler::END_TAG_MARKER => '}',
    Compiler::SEGMENT_DELIMITER => '/',
    Compiler::OPTIONAL_TAG_SYMBOL => '?',
    Compiler::WILDCARD => '[^/]+',
    Compiler::REGEX_DELIMITER => '`',
    Compiler::REGEX_MODIFIER => 'u', 
]);
```

## Tags and segments

All recognizable patterns must have a symbol or a group of symbols that acts as a delimiter and splits a pattern 
into segments. For a file path pattern that delimiter is the `/` sign while for a host name pattern the delimiter 
is the `.` sign. In the case of the custom pattern presented above, the delimiter is `, `(comma followed by space).
The default delimiter is set to be the `/` mark, and it can be changed in the configuration array
by using the `Compiler::SEGMENT_DELIMITER` key

```php
use Opis\Colibri\Compiler;

$compiler = new Compiler([
    Compiler::SEGMENT_DELIMITER => '.', // new delimiter
]);
```

Pattern's segments can be tagged and then replaced with regex expressions by enclosing them with a start tag marker and
an end tag marker. The text enclosed by the markers represents the tag's name and acts as an identifier for that specific
segment.

```php
use Opis\Colibri\Compiler;

//Default configuration
$compiler = new Compiler();

// Pattern
$pattern = '/a/{b}/c';

// Replace the segment tagged and identified as 'b' with a custom regex expression.
echo $compiler->getRegex($pattern, [
    'b' => '[a-z]+'
]);
// Outputs: `^/a/(?P<b>([a-z]+))/c(/)?$`u
```

As you can see in the above example, the method used to compile a pattern into a regex rule is called `getRegex` and
takes as an argument the pattern you want to compile and a array that will used to map tags to regex expression and 
replace them in the final regex rule.

If you omit to specify a value for a tag, then a default regex expression will be used. 

```php
echo $compiler->getRegex($patern);
// Outputs: `^/a/(?P<b>([^/]+))/c(/)?$`u
```

The default regex expression is automatically derived from the existing settings, 
but it can be also manually set as well.

```php
$compiler = new Compiler([
    Compiler::WILDCARD => '[0-9]+'
]);
```

The default symbols used for delimiting tags (`{` and `}`) can be easily replaced in the configuration array:

```php
$compiler = new Compiler([
    Compiler::START_TAG_MARKER => '<',
    Compiler::END_TAG_MARKER => '>'
]);
$pattern = '/a/b/<c>';
echo $compiler->getRegex($patern);
// Outputs: `^/a/b/(?P<c>([^/]+))(/)?$`u
``` 

A tag can also be marked as being optional by using a predefined symbol that can be changed 
in the configuration array by using the `Compiler::OPTIONAL_TAG_SYMBOL` key. The default symbol for specifying 
an optional tag is the `?` mark.

```php
// The 'c' tag is optional
$pattern = '/a/b/{c?}';

echo $compiler->getRegex($pattern, [
    'c' => [0-9]+
]);
// Outputs: `^/a/b(?:/(?P<c>([0-9]+)))?(/)?$`u
```

## Compiler's methods

Beside the `getRegex` method described above, the `Compiler` class has two other method: `getKeys` and `getValues`.

The `getKeys` method can be used to extract all tag names from a given pattern.

```php
$pattern = '/a/b/{c}/d/{e?}';
$tags = $compiler->getKeys($pattern); 
// $tags = ['c', 'e']
```

The `getValues` method takes as an argument a regex expression (compiled from a pattern) and a path, and it returns
an array of values mapped to their corresponding tag names.

```php
use Opis\Colibri\Compiler;

//Default configuration
$compiler = new Compiler();

// Pattern
$pattern = '/a/b/{c}/d/{e?}';
// Path
$path = '/a/b/hello/d/world';
//Regex
$regex = $compiler->getRegex($pattern);

// Extract values
$values = $compiler->getValues($regex, $path);
/*
 $values = [
    'c' => 'hello', 
    'e' => 'world',
 ];
*/
```

## Capture mode

The capture mode tells the compiler how to deal with optional tags and how to transform them to regex expressions.
The default capture mode used is `Compiler::STANDARD_MODE`, 
which is just a shorter notation of the following bit operation:

```php
// Compiler::STANDARD_MODE
Compiler::CAPTURE_LEFT | Compiler::CAPTURE_TRAIL | Compiler::ADD_OPT_SEPARATOR;
```

The `Compiler::CAPTURE_LEFT` and `Compiler::CAPTURE_RIGHT` options are used to indicate which segment delimiter of
the pattern to capture together with the optional tag: the one to the left, or the other to the right.

```php
use Opis\Routing\Compiler;

$pattern = '/a/{b?}';

$compiler = new Compiler([
    Compiler::CAPTURE_MODE => Compiler::CAPTURE_LEFT
]);

// `^/a(?:/(?P<b>([^/]+)))?$`u
$regex_left = $compiler->getRegex($pattern);

$compiler = new Compiler([
    Compiler::CAPTURE_MODE => Compiler::CAPTURE_RIGHT
]);

// `^/a/((?P<b>([^/]+)))?$`u
$regex_right = $compiler->getRegex($pattern);

// Paths
$paths = ['/a', '/a/'];

foreach($paths as $path){
    var_dump((bool)preg_match($regex_left, $path));
    var_dump((bool)preg_match($regex_right, $path));
}

// Outputs
/*
bool(true)
bool(false)
bool(false)
bool(true)
*/
```

The `Compiler::CAPTURE_TRAIL` option tells the compiler to allow an optional extra segment delimiter symbol, 
either to the left of the regex expression or to the right, depending on the capture direction.

```php
use Opis\Routing\Compiler;

$pattern = '/a/{b}';

$compiler = new Compiler([
    Compiler::CAPTURE_MODE => Compiler::CAPTURE_LEFT | Compiler::CAPTURE_TRAIL
]);

// `^/a/(?P<b>([^/]+))(/)?$`u
$regex = $compiler->getRegex($pattern);
```

If the capture direction is to the left and the pattern doesn't start with a segment delimiter, you can
use the `Compiler::ADD_OPT_SEPARATOR` to add an optional segment delimiter to the beginning of the regex rule.

```php
use Opis\Routing\Compiler;

$pattern = '{a}/b';

$compiler = new Compiler([
    Compiler::CAPTURE_MODE => Compiler::CAPTURE_LEFT | Compiler::ADD_OPT_SEPARATOR
]);

// `^(/)?(?P<a>([^/]+))/b$`u
$regex = $compiler->getRegex($pattern);
```

You can also use this option if the capture direction is to the right and the pattern doesn't end with a
segment delimiter.

## The compiler
 
The compiler is represented by an instance of the `Opis\Routing\Compiler` class. It has the important role of
compiling a route's pattern into a regular expression that will be further used to 
match routes contained by the route collection against a given path.

The compiler takes as an argument an optional configuration array, that tells how the compiler will behave.
If no configuration is provided, then the following configuration will be assumed:

```php
use Opis\Routing\Compiler as C;

$compiler = new C([
    C::CAPTURE_MODE => C::STANDARD_MODE, // CAPTURE_LEFT|CAPTURE_TRAIL|OPT_SEPARATOR_TRAIL
    C::START_TAG => '{',
    C::END_TAG => '}',
    C::TAG_SEPARATOR => '/',
    C::OPTIONAL_TAG => '?',
    C::WILDCARD => '[^/]+', // '[^'.preg_quote($separator, $delimiter).']+'
]);
```

## The routing context

The routing context is an instance of `Opis\Routing\Context` and it is responsible for storing the path that needs
to be matched as well as other information that it's necessary during the routing process. This class can be extended
in order to provide custom routing context.

## The dispatcher

The dispatcher is the most critical component of the **Opis Routing** framework. It's main task is to
control and dictate every single step that it's involved into the routing process. Every dispatcher must
be represented by the instance of a class that implements the `Opis\Routing\IDispatcher` interface.
A default implementation is provided by the `Opis\Routing\Dispatcher` class.

## Filter and filter collections

Filters are instances of classes that are implementing the `Opis\Routing\IFilter` interface and are used
to eliminate routes that don't match certain criteria from the routing process.
Every filter must be stored into a filter collection represented by an instance of `Opis\Routing\FilterCollection` class.

## The router

The router's role is to put up all pieces together and to provide an entry point for the routing process.
The router is represented by the `Opis\Routing\Router` class. The constructor of this class takes as parameters
a route collection and optionally a dispatcher, a filter collection and an array of special values. The entry point
is represented by the `route` method which accepts as an argument an instance of a routing context.
