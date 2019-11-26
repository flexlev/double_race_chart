#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Created on Sun Nov 24 20:06:34 2019

@author: flex_lev
"""

import pandas as pd
import numpy as np

df_us = pd.read_csv("/home/flex_lev/Dev/Perso/double_race_chart/data/vendor-US-monthly-201003-201911.csv").drop(columns=["Unknown"])
df_china = pd.read_csv("/home/flex_lev/Dev/Perso/double_race_chart/data/vendor-CN-monthly-201003-201911.csv").drop(columns=["Unknown"])

#name value lastValue rank date
def create_dataframe(df, name = None):
    brands = [col for col in df.columns if "Date" not in col]
    unique_dates = df["Date"].unique()
    df_data = []
    for date in unique_dates:
        data = df[df["Date"] == date]
        for brand in brands:
            df_data.append( {"date": date, "name":brand + "_" + name, "value": data[brand].iloc[0]} )
    
    return pd.DataFrame( df_data )

df_us = create_dataframe(df_us, name= "us")
df_china = create_dataframe(df_china, name= "china")

df = pd.concat([df_us, df_china])

def find_lastValue(row):
    try:
        return df[(df["name"] == row["name"]) & (df["date"] < row["date"])].sort_values("date", ascending=False)["value"].iloc[0]
    except IndexError:
        #return current value (starting one)
        return df[(df["name"] == row["name"]) & (df["date"] <= row["date"])].sort_values("date", ascending=False)["value"].iloc[0]    

df["lastValue"] = df.apply(find_lastValue,axis=1)

def find_rank(row):
    values = df[(df["date"] == row["date"]) & (df["name"].str.contains("_" + row["name"].split("_")[1]))].sort_values("value", ascending=False)["name"].tolist()
    return values.index(row["name"]) + 1

df["rank"] = df.apply(find_rank,axis=1)

df[["name", "value", "lastValue", "rank", "date"]].sort_values(["date", "rank"], ascending=False).to_csv("/home/flex_lev/Dev/Perso/double_race_chart/data/data_final.csv", sep=",", index=False)