# -*- coding: utf-8 -*-
"""
Created on Wed Nov 13 08:46:45 2019

@author: user
"""

import pandas as pd
pd.set_option('display.max_rows', 500)
pd.set_option('display.max_columns', 200)
pd.set_option('display.width', 2000)
pd.set_option('display.float_format', '{:20,.2f}'.format)
pd.set_option('display.max_colwidth', -1)
import re
import datetime

from collections import OrderedDict

data = pd.read_csv("D:\\Dev\\perso\\obesityWorldwide_racingChart\\data\\obesity_data.csv")
data["value"] = data["Share of adults that are overweight (%)"]
data["name"] = data["Entity"]
data["year"] = data["Year"]

#find lastValue
def find_lastValue(row):
    try:
        return data[(data["name"] == row["name"]) & (data["year"] < row["year"])].sort_values("year", ascending=False)["value"].iloc[0]
    except IndexError:
        #return current value (starting one)
        return data[(data["name"] == row["name"]) & (data["year"] <= row["year"])].sort_values("year", ascending=False)["value"].iloc[0]    

data["lastValue"] = data.apply(find_lastValue,axis=1)

#keep only certain countries
countries_elligible = ["China",
                       "Indonesia",
                       "Japan",
                       "South Korea",
                       "France",
                       "Germany",
                       "Italy",
                       "United Kingdom",
                       "Argentina",
                       "Brazil",
                       "Mexico",
                       "India",
                       "Russia",
                       "South Africa",
                       "Turkey",
                       "Australia",
                       "Canada",
                       "Saudi Arabia",
                       "United States",]
data = data[data["name"].isin(countries_elligible)]

def find_rank(row):
    values = data[(data["year"] == row["year"])].sort_values("value", ascending=False)["name"].tolist()
    return values.index(row["name"]) + 1

data["rank"] = data.apply(find_rank,axis=1)


#joining data about population
#data = data[["name", "value", "lastValue", "rank", "year"]]
#
#population = pd.read_csv("D:\\Dev\\perso\\obesityWorldwide_racingChart\\data\\population.csv", sep=",", skiprows=4)
##append the right population
#def get_population(row):
#    return population[population["Country Name"] == row["name"]][str(row["year"])].iloc[0] * row["value"]/100
#
#data["population"] = data.apply(get_population, axis=1)
#data["value"] = data["population"]
#data["lastValue"] = data.apply(find_lastValue,axis=1)

data[["name", "value", "lastValue", "rank", "year"]].sort_values(["year", "rank"], ascending=False).to_csv("D:\\Dev\\perso\\obesityWorldwide_racingChart\\data\\obesity_data_processed.csv", sep=",", index=False)

