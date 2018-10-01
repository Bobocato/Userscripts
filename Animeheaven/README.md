# Animeheaven-Enhanced

A simple userscript that enables autoplay, auto fullscreen and keyboard controls on Animeheaven!

## Autoplay 
When the episode ends the next one will be loaded automatically. <br>

## Fullscreen
Once you press "v", the video will always be displayed on fullscreen. <br>
To end this you have to press "v" again.<br>
When the next episode will load in fullscreen there will be a popup showing the current episode.

## Playbackrate
If you have an option to change the playbackrate with an extension like <a href="https://github.com/igrigorik/videospeed">this</a> the speed you set will be stored an reapplied for the next video.

## Volume
The volume you set will be saved an reapplied when you watch the next episode. The volumebar will not be affected by the change.

## Keycodes
"n" = next epsiode <br>
"b" = previous episode <br>
"v" = toggle fullscreen <br>
"f" = toggle the browsers fullscreen (special request by jryan15)<br>
"m" = skip ahead for 85 seconds (perfect for op and ed)<br>
"s" = speed decreased by 0.1<br>
"d" = speed increased by 0.1<br>
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
