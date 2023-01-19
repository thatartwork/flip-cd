# Deprecated
A POC from 2013 using jQuery to showcase a CD album (jewelcase/digipak). Too many absolute positions, spaghetti code and magic numbers, but makes the work.
No intention to port this into other libraries such as React.

# Usage
- Import libraries and stylesheets.
  
```html
    <script type="text/javascript"  src="flip-cd.js"></script>
    <link rel="stylesheet" type="text/css" href="flip-cd.css"/>
```

- Create _art_area_ element.
  
```html
  <div id='art_area'></div>
```
- Execute createFlipCase with all cover assets and types.

```js
$(function () {
                var front_type="case_front_double";
                var front_source="album_scans/Booklet-9.jpg";
                var back_type="case_back_single";
                var back_source="album_scans/back_cover.jpg";
                var inlay_type="case_inlay_single";
                var inlay_source="album_scans/inlay_cover.jpg";
                var inside_type="case_inside_double";
                var inside_source="album_scans/Booklet-9.jpg";
                var left_type="case_left_single";
                var left_source="album_scans/back_cover.jpg";
                var disc_type="max_disc";
                var disc_source="album_scans/acd.jpg";
                var booklet=new Array(
                        new Array("scan_double_2", "album_scans/album_booklet(1-8).jpg"),
                        new Array("scan_double_1", "album_scans/album_booklet(3-8).jpg"),
                        new Array("scan_double_2", "album_scans/album_booklet(3-8).jpg"),
                        new Array("scan_double_1", "album_scans/album_booklet(5-8).jpg"),
                        new Array("scan_double_2", "album_scans/album_booklet(5-8).jpg"),
                        new Array("scan_double_1", "album_scans/album_booklet(6-8).jpg"),
                        new Array("scan_double_2", "album_scans/album_booklet(6-8).jpg"),
                        new Array("scan_double_1", "album_scans/album_booklet(8-8).jpg"),
                        new Array("scan_double_2", "album_scans/album_booklet(8-8).jpg"),
                        new Array("scan_double_1", "album_scans/album_booklet(1-8).jpg")
                );

                createFlipCase(front_type,
                    front_source,
                    back_type,
                    back_source,
                    inlay_type,
                    inlay_source,
                    inside_type,
                    inside_source,
                    left_type,
                    left_source,
                    disc_type,
                    disc_source,
                    booklet);
            });
```

## Front

 ```
 case_front_single
 case_front_double
 digipak_front_single
 digipak_front_double
```

## Back
 ```
 case_back_single
 digipak_back_single
 digipak_back_double
```

## Inlay
 ```
 case_inlay_single
 digipak_inlay_double
 digipak_inlay_single
 case_inlay_single_black
```

## Inside
 ```
 case_inside_single
 case_inside_double
 digipak_inside_single
 digipak_inside_double
```

## Spine
 ```
 case_left_single
 digipak_left_single
 digipak_left_double
```

## disc
 ```
 max_disc
```

## Booklet
Even list of `[type, source]`, where type is as follows (`scan_double_1` means first page while `scan_double_2` represents the second page): 
```
 scan_single
 scan_double_1
 scan_double_2
```
Booklet is constructed with wowbook and has its own controls.
If empty list is provided no booklet will be created (but front/inside will be displayed)

