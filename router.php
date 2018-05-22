<?php
/* ===========================================================================
 * Copyright 2013-2016 The Opis Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 * ============================================================================ */

/*
 * Use this file with the PHP's built in server.
 * Just type the following command and point your browser to http://localhost:8080/
 *
 * php -S localhost:8080 -t _site/ router.php
 */

$path = $_SERVER['REQUEST_URI'];

if(false !== $pos = strpos($path, '?')){
    $len = strlen($path);
    $path = substr($path, 0, $len - ($len - $pos));
}

$path = urldecode($path);

if($path === '/'){
    $path = '/index.html';
}

if(!preg_match('/^\/assets/', $path)){
    if(!preg_match('/\.(html|css|js|png|jpg|gif|svg|json|xml)+$/', $path)){
        $path .= '/index.html';
    }
}

$rules = [
    '/^\/orm/' => __DIR__ . '/../orm/_site',
    '/^\/database/' => __DIR__ . '/../database/_site',
    '/^\/closure/' => __DIR__ . '/../closure/_site',
    '/^\/container/' => __DIR__ . '/../container/_site',
    '/^\/view/' => __DIR__ . '/../view/_site',
    '/^\/cache/' => __DIR__ . '/../cache/_site',
    '/^\/session/' => __DIR__ . '/../session/_site',
    '/^\/config/' => __DIR__ . '/../config/_site',
    '/^\/routing/' => __DIR__ . '/../routing/_site',
    '/^\/http-routing/' => __DIR__ . '/../http-routing/_site',
    '/^\/http/' => __DIR__ . '/../http/_site',
    '/^\/events/' => __DIR__ . '/../events/_site',
    '/^\/json-schema/' => __DIR__ . '/../json-schema/_site',
    '/^\/pattern/' => __DIR__ . '/../pattern/_site',
    '/^\/intl/' => __DIR__ . '/../intl/_site',
    '/^\/string/' => __DIR__ . '/../string/_site',
    '/^\/validation/' => __DIR__ . '/../validation/_site'
];

$file = resolve_path($path, $rules);

if (file_exists($file) && is_file($file)){
    $ext = pathinfo($file, PATHINFO_EXTENSION);
    $mime = get_mime_types();
    header('Content-Type: ' . ($mime[$ext] ?? 'application/octet-stream'));
    readfile($file);

    return;
}



function resolve_path($path, $rules){
    foreach ($rules as $pattern => $root){
        if(preg_match($pattern, $path)){
            $path = explode('/', $path);
            unset($path[1]);
            return $root . implode('/', $path);
        }
    }

    return $_SERVER['DOCUMENT_ROOT'] . $path;
}

function get_mime_types()
{

    return [
        'apk' => 'application/vnd.android.package-archive',
        'txt' => 'text/plain',
        'htm' => 'text/html',
        'html' => 'text/html',
        'php' => 'text/html',
        'css' => 'text/css',
        'csv' => 'text/csv',
        'ics' => 'text/calendar',
        'js' => 'application/javascript',
        'json' => 'application/json',
        'text' => 'application/plain',
        'xml' => 'application/xml',
        'xsl' => 'text/xsl',
        'swf' => 'application/x-shockwave-flash',
        'flv' => 'video/x-flv',
        'png' => 'image/png',
        'jpe' => 'image/jpeg',
        'jpeg' => 'image/jpeg',
        'jpg' => 'image/jpeg',
        'gif' => 'image/gif',
        'bmp' => 'image/bmp',
        'ico' => 'image/vnd.microsoft.icon',
        'tiff' => 'image/tiff',
        'tif' => 'image/tiff',
        'svg' => 'image/svg+xml',
        'svgz' => 'image/svg+xml',
        'eot' => 'application/vnd.ms-fontobject',
        'woff' => 'application/x-font-woff',
        'woff2' => 'application/x-font-woff',
        'ttf' => 'application/x-font-ttf',
        'zip' => 'application/zip',
        'rar' => 'application/x-rar-compressed',
        'gz' => 'application/x-gzip',
        'gzip' => 'application/x-gzip',
        'tar' => 'application/x-tar',
        'exe' => 'application/x-msdownload',
        'msi' => 'application/x-msdownload',
        'cab' => 'application/vnd.ms-cab-compressed',
        'flac' => 'audio/x-flac',
        'm4a' => 'audio/mp4',
        'mp3' => 'audio/mpeg3',
        'mp4' => 'audio/mp4',
        'mpg' => 'audio/mpeg',
        'oga' => 'audio/ogg',
        'ogg' => 'audio/ogg',
        'wav' => 'audio/wav',
        'webm' => 'audio/webm',
        '3gp' => 'video/3gpp',
        'avi' => 'video/x-msvideo',
        'qt' => 'video/quicktime',
        'mov' => 'video/quicktime',
        'gt' => 'video/quicktime',
        'mpeg' => 'video/mpeg',
        'wmv' => 'video/x-ms-wmv',
        'ogv' => 'video/ogg',
        'pdf' => 'application/pdf',
        'psd' => 'image/vnd.adobe.photoshop',
        'ai' => 'application/postscript',
        'eps' => 'application/postscript',
        'ps' => 'application/postscript',
        'doc' => 'application/msword',
        'pps' => 'application/vnd.ms-powerpoint',
        'docx' => 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        'pptx' => 'application/vnd.openxmlformats-officedocument.presentationml.presentation',
        'xlsx' => 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'rtf' => 'application/rtf',
        'xls' => 'application/vnd.ms-excel',
        'ppt' => 'application/vnd.ms-powerpoint',
        'odp' => 'application/vnd.oasis.opendocument.text',
        'odt' => 'application/vnd.oasis.opendocument.text',
        'ods' => 'application/vnd.oasis.opendocument.spreadsheet',
        'kml' => 'application/vnd.google-earth.kml+xml',
        'kmz' => 'application/vnd.google-earth.kmz',
    ];
}

function supported_extension($ext)
{
    return in_array($ext, ['xml', 'xsl', 'xsd', '3gp', 'apk', 'avi', 'bmp', 'csv', 'doc', 'docx', 'flac', 'gz', 'gzip',
        'ics', 'kml', 'kmz', 'm4a', 'mp3', 'mp4', 'mpg', 'mpeg', 'mov', 'odp', 'ods', 'odt', 'oga', 'pdf', 'pptx', 'pps',
        'qt', 'swf', 'tar', 'text', 'tif', 'wav', 'wmv', 'xls', 'xlsx', 'zip', 'ogg', 'ogv', 'webm', 'htm', 'svg']);
}