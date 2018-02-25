#!/bin/bash
ls *global* |cut -c1-8 |uniq >stringList.txt
