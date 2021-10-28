/*
 *                _       _      _     
 *  ___  ___ _ __(_)_ __ | |_   (_)___ 
 * / __|/ __| '__| | '_ \| __|  | / __|
 * \__ \ (__| |  | | |_) | |_ _ | \__ \
 * |___/\___|_|  |_| .__/ \__(_)/ |___/
 *                 |_|        |__/     
 * 
 * my first js for interactive webpage!
 */

const images = [
  'IMG_5997.JPG',
  'IMG_5998.JPG',
  'IMG_5999.JPG',
  'IMG_6001.JPG',
  'IMG_6002.JPG',
  'IMG_6003.JPG',
  'IMG_6004.JPG',
  'IMG_6005.JPG',
  'IMG_6006.JPG',
  'IMG_6007.JPG',
]
const folder = 'osassets/'
const npics = images.length

/*
 * get image file path given image id
 */
function get_image_path(i)
{
  return folder + images[i]
}

let small_temp = document.getElementById('js-small-img')
let small_holder = document.getElementById('js-small-img-container')
let large_holder = document.getElementById('js-large-img-container')
let large_img = document.getElementById('js-large-img')
let button_left = document.getElementById('js-button-left')
let button_cancel = document.getElementById('js-button-cancel')
let button_right = document.getElementById('js-button-right')

/*
 * on startup the site contains only one <img>
 * this function will use that as a template,
 * and insert and setup all the images listed in the images[] array
 */
function setup_images()
{
  small_holder.removeChild(small_temp)

  for (var i = 0; i < npics; i++)
  {
    var clone = small_temp.cloneNode(true)
    clone.src = get_image_path(i)
    clone.alt = images[i]

    clone.onclick = hof_onclick(i)

    small_holder.appendChild(clone)
  }
}
setup_images()

/*
 * this function returns an event handler for image i
 */
function hof_onclick(i)
{
  return function()
  {
    large_img.src = get_image_path(i)
    large_img.alt = images[i]

    large_holder.style.visibility = 'visible'
    small_holder.style.visibility = 'hidden'

    // setup left, cancel, right buttons
    var left_handler = nullfunc; 
    if (i-1 >= 0)
    {
      left_handler = hof_onclick(i-1)
      button_left.onclick = left_handler
      button_left.style.visibility = 'visible'
    }
    else
    {
      button_left.style.visibility = 'hidden'
    }

    var right_handler = nullfunc;
    if (i+1 < npics)
    {
      right_handler = hof_onclick(i+1)
      button_right.onclick = hof_onclick(i+1)
      button_right.style.visibility = 'visible'
    }
    else
    {
      button_right.style.visibility = 'hidden'
    }

    // setup arrow keys
    document.onkeydown = function(e)
    {
      if (e.keyCode == '37') // left arrow key
      {
        left_handler()
      }
      else if (e.keyCode == '39') // right arrow key
      {
        right_handler()
      }
    }

    /*
     * exit from the large image view
     */
    button_cancel.onclick = function()
    {
      large_holder.style.visibility = 'hidden'
      button_left.style.visibility = 'hidden'
      button_right.style.visibility = 'hidden'
      small_holder.style.visibility = 'visible'
      document.onkeydown = nullfunc
    }
  }
}

function nullfunc() {}
