#!/bin/bash

ask simulate -t "Open cat-a-log database"   -l "en-US" --force-new-session
ask simulate -t "describe Felix"            -l "en-US"
ask simulate -t "end"                       -l "en-US"
