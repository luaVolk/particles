# Particles

Port of [Vincent Garreau' particles.js](https://github.com/VincentGarreau/particles.js) written in Dart.

## Instalation

  ```bash
  $ pub get particles
  ```

## Usage

The particle class takes 2 optional named arguments: `id` of type `String`, and `config` of type `Map<String, dynamic>`.

```dart
Particles particles = new Particles(id: 'id', config: {/*configuration map*/}).start();
```

## Configuration

The default config Map looks something like this

```dart
Map<String, dynamic> settings = {
  'particles': {
    'number': {
      'value': 100,
      'density': {
        'enable': true,
        'value_area': 800
      }
    },
    'color': {
      'value': '#fff'
    },
    'shape': {
      'type': 'circle',
      'stroke': {
        'width': 0,
        'color': '#ff0000'
      },
      'polygon': {
        'nb_sides': 5
      },
      'character': {
        'value': 'P',
        'font': 'arial',
        'style': 'normal',
        'weight': 'normal',
      },
      'image': {
        'src': '',
        'width': 100,
        'height': 100
      }
    },
    'opacity': {
      'value': 1,
      'random': false,
      'anim': {
        'enable': false,
        'speed': 2,
        'opacity_min': 0,
        'sync': false
      }
    },
    'size': {
      'value': 10,
      'random': false,
      'anim': {
        'enable': false,
        'speed': 20,
        'size_min': 0,
        'sync': false
      }
    },
    'line_linked': {
      'enable': true,
      'distance': 100,
      'color': '#FFFFFF',
      'opacity': 1,
      'width': 1
    },
    'move': {
      'enable': true,
      'speed': 6,
      'direction': 'none',
      'random': false,
      'straight': false,
      'out_mode': 'out',
      'parallax': true,
      'bounce': false,
      'attract': {
        'enable': false,
        'rotateX': 3000,
        'rotateY': 3000
      }
    }
  },
  'interactivity': {
    'detect_on': 'canvas',
    'events': {
      'onhover': {
        'enable': true,
        'mode': 'grab'
      },
      'onclick': {
        'enable': true,
        'mode': 'push'
      },
      'resize': true
    },
    'modes': {
      'grab':{
        'distance': 100,
        'line_linked':{
          'opacity': 1
        }
      },
      'bubble':{
        'distance': 100,
        'size': 40,
        'duration': 0.4,
        'opacity': 8,
        'speed': 3
      },
      'repulse':{
        'distance': 200,
        'duration': 0.4
      },
      'push':{
        'particles_nb': 4
      },
      'remove':{
        'particles_nb': 2
      }
    }
  },
  'retina_detect': false
};
```

key | type | default | notes
----|---------|------|------
`particles > number > value` | `num` | `100`
`particles > number > density > enable` | `bool` | `true`
`particles > number > density > value_area` | number | `800`
`particles > color > value` | `String`: Hex or `"random"`<br /> `List<String>`: Hex <br /> `Map<String, int>`: RGB or HSL | `#FFFFFF`| Examples: <br /> `"#b61924"` <br /> `["#b61924", "#333333", "999999"]` <br />`{r:182, g:25, b:36}` <br />  `{h:356, s:76, l:41}` <br /> `"random"`
`particles > shape > type` | `String` <br /> `List<String>` | `"circle"` | Examples: <br /> `"circle"` <br /> `"edge"` <br /> `"triangle"` <br /> `"polygon"` <br /> `"star"` <br /> `"image"`
`particles > shape > stroke > width` | `num` | `0`
`particles > shape > stroke > color` | `String` | `"#FF0000"`
`particles > shape > polygon > nb_slides` | `num` | `5`
`particles > shape > character > value` | `String` | `"P"`
`particles > shape > character > font` | `String` | `"arial"`
`particles > shape > character > style` | `String` | `"normal"` | Possible values are the same as in the CSS font-style property
`particles > shape > character > weight` | `String` | `"normal"` | Possible values are the same as in the CSS font-style property
`particles > shape > image > src` |`String` | `"particle.png"` | Needs cors access
`particles > shape > image > width` | `num` | `100`
`particles > shape > image > height` | `num` | `100`
`particles > opacity > value` | `num` | `0.75` | 0 to 1
`particles > opacity > random` | `bool` | `false` 
`particles > opacity > anim > enable` | `bool` | `false` 
`particles > opacity > anim > speed` | `num` | `2`
`particles > opacity > anim > opacity_min` | `num` | `0` | 0 to 1
`particles > opacity > anim > sync` | `bool` | `false`
`particles > size > value` | `num` | `10`
`particles > size > random` | `bool` | `false` 
`particles > size > anim > enable` | `bool` | `false` 
`particles > size > anim > speed` | `num` | `20`
`particles > size > anim > size_min` | `num` | `0`
`particles > size > anim > sync` | `bool` | `false`
`particles > line_linked > enable` | `bool` | `true`
`particles > line_linked > distance` | `num` | `100`
`particles > line_linked > color` | `String` | `#FFFFFF`
`particles > line_linked > opacity` | `num` | `1` | 0 to 1
`particles > line_linked > width` | `num` | `1`
`particles > move > enable` | `bool` | `true`
`particles > move > speed` | `num` | `6`
`particles > move > direction` | `String` | `"none"` | Possible values: <br />`"none"` <br /> `"top"` <br /> `"top-right"` <br /> `"right"` <br /> `"bottom-right"` <br /> `"bottom"` <br /> `"bottom-left"` <br /> `"left"` <br /> `"top-left"`
`particles > move > random` | `bool` |`false`
`particles > move > straight` | `bool` | `false`
`particles > move > out_mode` | `String` | `"out"` | Possible values: <br /> `"out"` <br /> `"bounce"`
`particles > move > bounce` | `bool` | `false` | Bounce between particles
`particles > move > attract > enable` | `bool` |`false`
`particles > move > attract > rotateX` | `num` | `3000`
`particles > move > attract > rotateY` | `num` | `3000`
`interactivity > detect_on` | `String` | `"canvas"` | Possible values: <br /> `"canvas"` <br /> `"window"`
`interactivity > events > onhover > enable` | `bool` | `true`
`interactivity > events > onhover > mode` | `String` <br /> `List<String>` | `"grab"` | Possible values: <br /> `"grab"` <br /> `"bubble"` <br /> `"repulse"`
`interactivity > events > onclick > enable` | `bool` | `true`
`interactivity > events > onclick > mode` | `String` <br /> `List<String>` | `"push"` | Possible values: <br /> `"push"` <br /> `"remove"` <br /> `"bubble"` <br /> `"repulse"`
`interactivity > events > resize` | `bool` | `true`
`interactivity > events > modes > grab > distance` | `num` | `100`
`interactivity > events > modes > grab > line_linked.opacity` | `num` | `0.75` | 0 to 1
`interactivity > events > modes > bubble > distance` | `num` | `100`
`interactivity > events > modes > bubble > size` | `num` | `40`
`interactivity > events > modes > bubble > duration` | `num` | `0.4` | in seconds
`interactivity > events > modes > repulse > distance` | `num` | `200`
`interactivity > events > modes > repulse > duration` | `num` | `0.4` | in seconds
`interactivity > events > modes > push > particles_nb` | `num` | `4`
`interactivity > events > modes > push > particles_nb` | `num` | `2`
`retina_detect` | `bool` | `false`

-------------------------------