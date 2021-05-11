# Synth

## To-dos:

- [x] Event listener only on mouse down. Delete listener on mouse up
- [x] Create Grid (Material design)
- [ ] ADSR feature
- [ ] Knob : handle optional logarythmical scale
- [ ] Add Octave selector (https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/range)
- [ ] Sound Visualisation (https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode)
- [ ] Preset
  - [ ] Store preset in backend "factory preset", not modifiable
  - [ ] Save user preset as coockie "user Preset"
  - [ ] UX for presets in frontend Load/save/export
- [ ] ~Record (and save as wave)~ 
  - [ ] save in byte array -> then data_array saved in link, open link _Prog_ 
  - [ ] check pdf erstellung in webOrderFrontend
- [ ] ~Midi~
 

### TODO: 
Prepare statemenet to avoid "SQL injection"
mysql.prepare() <- prepare statement

https://dzone.com/articles/the-easiest-way-to-query-postgres-in-nodejs-secure?utm_medium=feed&utm_source=feedpress.me&utm_campaign=Feed%3A+dzone%2Fwebdev

Split endpoint into MVC: Model (object preset) View Controller Service Repository
-> repository makes the SQL
Google "Design pattern" (e.g. singleton)