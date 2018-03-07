# Animeheaven-Enhanced
A simple userscript that enables autoplay, auto fullscreen and keyboard controls on Animeheaven!

## Autoplay 
When the episode ends the next one will be loaded automatically. <br>
The skip will happen at the end of an episode or when the set timer is reached.

<b>For it to work you have to set it at least once.</b>

## Fullscreen
Once you hit the "fullscreen" box and save it or press "v", the video will always be displayed on fullscreen. <br>
To end this you have to press "v", or delete the "fullscreen" flag in the localStorage and reload the page. <br>
The UI has to reload the Page to display the video in fullscreen. <br>
When you use "v" there won't be any reloading.

## Playbackrate
If you have an option to change the playbackrate with an extension like <a href="https://github.com/igrigorik/videospeed">this</a> the speed you set will be stored an reapplied for the next video.

## Volume
The voume you set will be saved an reapplied when you watch the next episode. The volumebar will not be affected by the change.

## Keycodes
"n" = next epsiode <br>
"b" = previous episode <br>
"v" = toggle fullscreen <br>
"m" = skip ahead for 85 seconds (perfect for op and ed)<br>
Arrow left = reverse 5 seconds <br>
Arrow right = skip 5 seconds<br>
Arrow up = volume + 5%<br>
Arrow down = volume - 5%<br>

# Episode Saver
A extra Userscript, that saves when you have watched a Episode and shows the watched episodes in the overview page. It will show a small extra table at the startpage.<br>
If you want to remove them from the list, you can use the "X" on the right side.

## Usage
I have written the script for Tampermonkey in Chrome. I don't intend to test it in any other browser. If there are issues let me know and i will look into it :-)

### Step 1
Download Tampermonkey Chrome extension
### Step 2
Click on the icon and choose "Add new script"
### Step 3
Copy the whole "AnimeheavenEnhanced.user.js" and paste it in there
### Step4
Save and have fun!

If you want to add the "EpisodeSave"-Script too, you can add another script and paste the content of the "AnimeheavenEpisodeSaver.user.js" document there.

## Bugs
If you find something that seems wrong let me know!
