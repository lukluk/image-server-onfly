# image-server-onfly

## Example

https://DOMAIN/SOURCENAME/PATH?q=QUALITY&w=WIDTH&h=HEIGHT&MORE..

w and h keep aspect ratio, you can just define w or h


```
https://imgix.livaza.xyz/backend/Bazaar%20Sofa_2017.jpg?q=60&w=500
```
![alt tag](https://imgix.livaza.xyz/backend/Bazaar%20Sofa_2017.jpg?q=60&w=500)

## QUERY

```
    trim:           optional. default: false. trims edges that are the background color.
    trimFuzz:       optional. [0-1) float, default 0. trimmed color distance to edge color, 0 is exact.
    density         optional. Integer dpi value to convert
    resizeStyle:    optional. default: 'aspectfill'. can be 'aspectfit', 'fill'
                    aspectfill: keep aspect ratio, get the exact provided size.
                    aspectfit:  keep aspect ratio, get maximum image that fits inside provided size
                    fill:       forget aspect ratio, get the exact provided size
    gravity:        optional. default: 'Center'. used to position the crop area when resizeStyle is 'aspectfill'
                              can be 'NorthWest', 'North', 'NorthEast', 'West',
                              'Center', 'East', 'SouthWest', 'South', 'SouthEast', 'None'
    format:         optional. output format, ex: 'JPEG'. see below for candidates
    filter:         optional. resize filter. ex: 'Lagrange', 'Lanczos'.  see below for candidates
    blur:           optional. ex: 0.8
    strip:          optional. default: false. strips comments out from image.
    rotate:         optional. degrees.
    flip:           optional. vertical flip, true or false.
```

## Config
### SOURCE
```
LINE 25 - 29
paths['catalog']='https://static.livaza.com/magemedia'
paths['product']='https://static.livaza.com/product'
paths['v2assets']='https://10.130.46.33/assets'
paths['backend']='http://10.130.40.28/image'
```
