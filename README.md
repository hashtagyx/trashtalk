# TrashTalk

An app to monitor your fleet of smart trashbins. 
<br><br>
<img src="https://user-images.githubusercontent.com/61932721/166980235-cf2a5835-3c5d-4958-aab4-b5908111fb65.png" width="200">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<img src="https://user-images.githubusercontent.com/61932721/166985840-695bf27d-4a49-41f9-9e27-8efac4ab539d.png" width="200">
<br><br>

This is a (part of a) solution to tackle the problem of waste collection. By leveraging on a network of smart bin sensors installed on a fleet of regular trash bins, we can monitor and store the fill levels of each smart bin in our network. Using collected data and historical trends, we can make smart decisions on when and where to allocate manpower efficiently, increasing operational efficiency.


## Tracking trash one bin at a time
Built atop Google Maps for a robust and seamless smart bin tracking experience. Smart bin sensors are marked on the map for you to track your fleet of bin sensors. Search for smart bins in your vicinity with the integrated Google search bar.
<br>

## Let your trash do the talking
Enjoy real-time sensor data at your fingertips, updated on the fly. Monitor the live fill levels of your trash bins, and avoid wasted trips to empty bins.
<br>

## Walk the talk with smart routing
Enjoy a smooth experience clearing the bins which need emptying the most. Generate the shortest path through all bins with significant trash levels, to increase the efficiency of each trip.
<br>

## Usage
Run react-native run-android on the command line.

Insert Google API key in these files:
> android/app/src/main/AndroidManifest.xml (Line 28)<br>
> components/Map.js
