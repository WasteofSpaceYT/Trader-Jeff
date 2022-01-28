from flask import Flask

app = Flask(__name__)

@app.route("/")
def hello():
    return "Hello, World!"

# Raw Package
import numpy as np
import pandas as pd

#Data Source
import yfinance as yf

#Data viz
import plotly.graph_objs as go
import chart_studio
import chart_studio.plotly as py
import chart_studio.tools as tls
#Interval required 1 minute
data = yf.download(tickers='TSLA', period='1d', interval='1m')

#declare figure
fig = go.Figure()

#Candlestick
fig.add_trace(go.Candlestick(x=data.index,
                open=data['Open'],
                high=data['High'],
                low=data['Low'],
                close=data['Close'], name = 'market data'))

# Add titles
fig.update_layout(
    yaxis_title='Stock Price (USD per Shares)')

# X-Axes
fig.update_xaxes(
    rangeslider_visible=True,
    rangeselector=dict(
        buttons=list([
            dict(count=15, label="15m", step="minute", stepmode="backward"),
            dict(count=45, label="45m", step="minute", stepmode="backward"),
            dict(count=1, label="HTD", step="hour", stepmode="todate"),
            dict(count=3, label="3h", step="hour", stepmode="backward"),
            dict(step="all")
        ])
    )
)

#Show
username = 'WasteofSpaceYT'
api_key='QOzrTP8NF2Z7ZEmU3J5Q'
chart_studio.tools.set_credentials_file(username=username, api_key=api_key)
py.plot(fig, filename='Candlestick Chart', auto_open=False)