import Stock from "../Database Schema/StockLocal.js";
import mongoose from "mongoose";
import axios from "axios";

//connect to mongodb
console.log("mongoURI: ", mongoURI);
const connectToMongoDB = async () => {
    return new Promise((resolve, reject) => {
        mongoose.connect(mongoURI, {
            serverSelectionTimeoutMS: 5000 // 5 seconds timeout
        })
            .then(() => {
                console.log('MongoDB connected');
                resolve();
            })
            .catch((err) => {
                console.error('Error connecting to MongoDB:', err.message);
                reject(err);
            });
    });
};

const testingData = {
    'Meta Data': {
      '1. Information': 'Daily Prices (open, high, low, close) and Volumes',
      '2. Symbol': 'AAPL',
      '3. Last Refreshed': '2024-08-29',
      '4. Output Size': 'Compact',
      '5. Time Zone': 'US/Eastern'
    },
    'Time Series (Daily)': {
      '2024-08-29': {
        '1. open': '230.0000',
        '2. high': '232.9200',
        '3. low': '228.8800',
        '4. close': '229.7900',
        '5. volume': '51819060'
      },
      '2024-08-28': {
        '1. open': '227.9200',
        '2. high': '229.8600',
        '3. low': '225.6800',
        '4. close': '226.4900',
        '5. volume': '38052167'
      },
      '2024-08-27': {
        '1. open': '225.9950',
        '2. high': '228.8500',
        '3. low': '224.8900',
        '4. close': '228.0300',
        '5. volume': '35934559'
      },
      '2024-08-26': {
        '1. open': '226.7600',
        '2. high': '227.2800',
        '3. low': '223.8905',
        '4. close': '227.1800',
        '5. volume': '30602208'
      },
      '2024-08-23': {
        '1. open': '225.6589',
        '2. high': '228.2200',
        '3. low': '224.3300',
        '4. close': '226.8400',
        '5. volume': '38677250'
      },
      '2024-08-22': {
        '1. open': '227.7900',
        '2. high': '228.3400',
        '3. low': '223.9000',
        '4. close': '224.5300',
        '5. volume': '43695321'
      },
      '2024-08-21': {
        '1. open': '226.5200',
        '2. high': '227.9800',
        '3. low': '225.0500',
        '4. close': '226.4000',
        '5. volume': '34765480'
      },
      '2024-08-20': {
        '1. open': '225.7700',
        '2. high': '227.1700',
        '3. low': '225.4500',
        '4. close': '226.5100',
        '5. volume': '30299033'
      },
      '2024-08-19': {
        '1. open': '225.7200',
        '2. high': '225.9900',
        '3. low': '223.0400',
        '4. close': '225.8900',
        '5. volume': '40687813'
      },
      '2024-08-16': {
        '1. open': '223.9200',
        '2. high': '226.8271',
        '3. low': '223.6501',
        '4. close': '226.0500',
        '5. volume': '44340240'
      },
      '2024-08-15': {
        '1. open': '224.6000',
        '2. high': '225.3500',
        '3. low': '222.7600',
        '4. close': '224.7200',
        '5. volume': '46414013'
      },
      '2024-08-14': {
        '1. open': '220.5700',
        '2. high': '223.0300',
        '3. low': '219.7000',
        '4. close': '221.7200',
        '5. volume': '41960574'
      },
      '2024-08-13': {
        '1. open': '219.0100',
        '2. high': '221.8900',
        '3. low': '219.0100',
        '4. close': '221.2700',
        '5. volume': '44155331'
      },
      '2024-08-12': {
        '1. open': '216.0700',
        '2. high': '219.5099',
        '3. low': '215.6000',
        '4. close': '217.5300',
        '5. volume': '38028092'
      },
      '2024-08-09': {
        '1. open': '212.1000',
        '2. high': '216.7800',
        '3. low': '211.9700',
        '4. close': '216.2400',
        '5. volume': '42201646'
      },
      '2024-08-08': {
        '1. open': '213.1100',
        '2. high': '214.2000',
        '3. low': '208.8300',
        '4. close': '213.3100',
        '5. volume': '47161149'
      },
      '2024-08-07': {
        '1. open': '206.9000',
        '2. high': '213.6400',
        '3. low': '206.3900',
        '4. close': '209.8200',
        '5. volume': '63516417'
      },
      '2024-08-06': {
        '1. open': '205.3000',
        '2. high': '209.9900',
        '3. low': '201.0700',
        '4. close': '207.2300',
        '5. volume': '69660488'
      },
      '2024-08-05': {
        '1. open': '199.0900',
        '2. high': '213.5000',
        '3. low': '196.0000',
        '4. close': '209.2700',
        '5. volume': '119548589'
      },
      '2024-08-02': {
        '1. open': '219.1500',
        '2. high': '225.6000',
        '3. low': '217.7100',
        '4. close': '219.8600',
        '5. volume': '105568560'
      },
      '2024-08-01': {
        '1. open': '224.3700',
        '2. high': '224.4800',
        '3. low': '217.0200',
        '4. close': '218.3600',
        '5. volume': '62500996'
      },
      '2024-07-31': {
        '1. open': '221.4400',
        '2. high': '223.8200',
        '3. low': '220.6300',
        '4. close': '222.0800',
        '5. volume': '50036262'
      },
      '2024-07-30': {
        '1. open': '219.1900',
        '2. high': '220.3250',
        '3. low': '216.1200',
        '4. close': '218.8000',
        '5. volume': '41643840'
      },
      '2024-07-29': {
        '1. open': '216.9600',
        '2. high': '219.3000',
        '3. low': '215.7500',
        '4. close': '218.2400',
        '5. volume': '36311778'
      },
      '2024-07-26': {
        '1. open': '218.7000',
        '2. high': '219.4900',
        '3. low': '216.0100',
        '4. close': '217.9600',
        '5. volume': '41601345'
      },
      '2024-07-25': {
        '1. open': '218.9300',
        '2. high': '220.8500',
        '3. low': '214.6200',
        '4. close': '217.4900',
        '5. volume': '51391199'
      },
      '2024-07-24': {
        '1. open': '224.0000',
        '2. high': '224.8000',
        '3. low': '217.1300',
        '4. close': '218.5400',
        '5. volume': '61777576'
      },
      '2024-07-23': {
        '1. open': '224.3650',
        '2. high': '226.9400',
        '3. low': '222.6800',
        '4. close': '225.0100',
        '5. volume': '39960260'
      },
      '2024-07-22': {
        '1. open': '227.0100',
        '2. high': '227.7800',
        '3. low': '223.0900',
        '4. close': '223.9600',
        '5. volume': '48201835'
      },
      '2024-07-19': {
        '1. open': '224.8200',
        '2. high': '226.8000',
        '3. low': '223.2750',
        '4. close': '224.3100',
        '5. volume': '49151453'
      },
      '2024-07-18': {
        '1. open': '230.2800',
        '2. high': '230.4400',
        '3. low': '222.2700',
        '4. close': '224.1800',
        '5. volume': '66034585'
      },
      '2024-07-17': {
        '1. open': '229.4500',
        '2. high': '231.4599',
        '3. low': '226.6400',
        '4. close': '228.8800',
        '5. volume': '57345884'
      },
      '2024-07-16': {
        '1. open': '235.0000',
        '2. high': '236.2700',
        '3. low': '232.3300',
        '4. close': '234.8200',
        '5. volume': '43234278'
      },
      '2024-07-15': {
        '1. open': '236.4800',
        '2. high': '237.2300',
        '3. low': '233.0900',
        '4. close': '234.4000',
        '5. volume': '62631252'
      },
      '2024-07-12': {
        '1. open': '228.9200',
        '2. high': '232.6400',
        '3. low': '228.6800',
        '4. close': '230.5400',
        '5. volume': '53046527'
      },
      '2024-07-11': {
        '1. open': '231.3900',
        '2. high': '232.3900',
        '3. low': '225.7700',
        '4. close': '227.5700',
        '5. volume': '64710617'
      },
      '2024-07-10': {
        '1. open': '229.3000',
        '2. high': '233.0800',
        '3. low': '229.2500',
        '4. close': '232.9800',
        '5. volume': '62627687'
      },
      '2024-07-09': {
        '1. open': '227.9300',
        '2. high': '229.4000',
        '3. low': '226.3721',
        '4. close': '228.6800',
        '5. volume': '48169822'
      },
      '2024-07-08': {
        '1. open': '227.0900',
        '2. high': '227.8500',
        '3. low': '223.2500',
        '4. close': '227.8200',
        '5. volume': '59085861'
      },
      '2024-07-05': {
        '1. open': '221.6500',
        '2. high': '226.4500',
        '3. low': '221.6500',
        '4. close': '226.3400',
        '5. volume': '60412408'
      },
      '2024-07-03': {
        '1. open': '220.0000',
        '2. high': '221.5500',
        '3. low': '219.0300',
        '4. close': '221.5500',
        '5. volume': '37369801'
      },
      '2024-07-02': {
        '1. open': '216.1500',
        '2. high': '220.3800',
        '3. low': '215.1000',
        '4. close': '220.2700',
        '5. volume': '58046178'
      },
      '2024-07-01': {
        '1. open': '212.0900',
        '2. high': '217.5100',
        '3. low': '211.9200',
        '4. close': '216.7500',
        '5. volume': '60402929'
      },
      '2024-06-28': {
        '1. open': '215.7700',
        '2. high': '216.0700',
        '3. low': '210.3000',
        '4. close': '210.6200',
        '5. volume': '82542718'
      },
      '2024-06-27': {
        '1. open': '214.6900',
        '2. high': '215.7395',
        '3. low': '212.3500',
        '4. close': '214.1000',
        '5. volume': '49772707'
      },
      '2024-06-26': {
        '1. open': '211.5000',
        '2. high': '214.8600',
        '3. low': '210.6400',
        '4. close': '213.2500',
        '5. volume': '66213186'
      },
      '2024-06-25': {
        '1. open': '209.1500',
        '2. high': '211.3800',
        '3. low': '208.6100',
        '4. close': '209.0700',
        '5. volume': '56713868'
      },
      '2024-06-24': {
        '1. open': '207.7200',
        '2. high': '212.7000',
        '3. low': '206.5900',
        '4. close': '208.1400',
        '5. volume': '80727006'
      },
      '2024-06-21': {
        '1. open': '210.3900',
        '2. high': '211.8900',
        '3. low': '207.1100',
        '4. close': '207.4900',
        '5. volume': '246421353'
      },
      '2024-06-20': {
        '1. open': '213.9300',
        '2. high': '214.2400',
        '3. low': '208.8500',
        '4. close': '209.6800',
        '5. volume': '86172451'
      },
      '2024-06-18': {
        '1. open': '217.5900',
        '2. high': '218.6300',
        '3. low': '213.0000',
        '4. close': '214.2900',
        '5. volume': '79943254'
      },
      '2024-06-17': {
        '1. open': '213.3700',
        '2. high': '218.9500',
        '3. low': '212.7200',
        '4. close': '216.6700',
        '5. volume': '93728300'
      },
      '2024-06-14': {
        '1. open': '213.8500',
        '2. high': '215.1700',
        '3. low': '211.3000',
        '4. close': '212.4900',
        '5. volume': '70122748'
      },
      '2024-06-13': {
        '1. open': '214.7400',
        '2. high': '216.7500',
        '3. low': '211.6000',
        '4. close': '214.2400',
        '5. volume': '97862729'
      },
      '2024-06-12': {
        '1. open': '207.3700',
        '2. high': '220.2000',
        '3. low': '206.9000',
        '4. close': '213.0700',
        '5. volume': '198134293'
      },
      '2024-06-11': {
        '1. open': '193.6500',
        '2. high': '207.1600',
        '3. low': '193.6300',
        '4. close': '207.1500',
        '5. volume': '172373296'
      },
      '2024-06-10': {
        '1. open': '196.9000',
        '2. high': '197.3000',
        '3. low': '192.1500',
        '4. close': '193.1200',
        '5. volume': '97262077'
      },
      '2024-06-07': {
        '1. open': '194.6500',
        '2. high': '196.9400',
        '3. low': '194.1400',
        '4. close': '196.8900',
        '5. volume': '53103912'
      },
      '2024-06-06': {
        '1. open': '195.6850',
        '2. high': '196.5000',
        '3. low': '194.1700',
        '4. close': '194.4800',
        '5. volume': '41181753'
      },
      '2024-06-05': {
        '1. open': '195.4000',
        '2. high': '196.9000',
        '3. low': '194.8700',
        '4. close': '195.8700',
        '5. volume': '54156785'
      },
      '2024-06-04': {
        '1. open': '194.6350',
        '2. high': '195.3200',
        '3. low': '193.0342',
        '4. close': '194.3500',
        '5. volume': '47471445'
      },
      '2024-06-03': {
        '1. open': '192.9000',
        '2. high': '194.9900',
        '3. low': '192.5200',
        '4. close': '194.0300',
        '5. volume': '50080539'
      },
      '2024-05-31': {
        '1. open': '191.4400',
        '2. high': '192.5700',
        '3. low': '189.9100',
        '4. close': '192.2500',
        '5. volume': '75158277'
      },
      '2024-05-30': {
        '1. open': '190.7600',
        '2. high': '192.1800',
        '3. low': '190.6300',
        '4. close': '191.2900',
        '5. volume': '49947941'
      },
      '2024-05-29': {
        '1. open': '189.6100',
        '2. high': '192.2470',
        '3. low': '189.5100',
        '4. close': '190.2900',
        '5. volume': '53068016'
      },
      '2024-05-28': {
        '1. open': '191.5100',
        '2. high': '193.0000',
        '3. low': '189.1000',
        '4. close': '189.9900',
        '5. volume': '52280051'
      },
      '2024-05-24': {
        '1. open': '188.8200',
        '2. high': '190.5800',
        '3. low': '188.0404',
        '4. close': '189.9800',
        '5. volume': '36326975'
      },
      '2024-05-23': {
        '1. open': '190.9800',
        '2. high': '191.0000',
        '3. low': '186.6250',
        '4. close': '186.8800',
        '5. volume': '51005924'
      },
      '2024-05-22': {
        '1. open': '192.2650',
        '2. high': '192.8231',
        '3. low': '190.2700',
        '4. close': '190.9000',
        '5. volume': '34648547'
      },
      '2024-05-21': {
        '1. open': '191.0900',
        '2. high': '192.7300',
        '3. low': '190.9201',
        '4. close': '192.3500',
        '5. volume': '42309401'
      },
      '2024-05-20': {
        '1. open': '189.3250',
        '2. high': '191.9199',
        '3. low': '189.0100',
        '4. close': '191.0400',
        '5. volume': '44361275'
      },
      '2024-05-17': {
        '1. open': '189.5100',
        '2. high': '190.8100',
        '3. low': '189.1800',
        '4. close': '189.8700',
        '5. volume': '41282925'
      },
      '2024-05-16': {
        '1. open': '190.4700',
        '2. high': '191.0950',
        '3. low': '189.6601',
        '4. close': '189.8400',
        '5. volume': '52845230'
      },
      '2024-05-15': {
        '1. open': '187.9100',
        '2. high': '190.6500',
        '3. low': '187.3700',
        '4. close': '189.7200',
        '5. volume': '70399988'
      },
      '2024-05-14': {
        '1. open': '187.5100',
        '2. high': '188.3000',
        '3. low': '186.2900',
        '4. close': '187.4300',
        '5. volume': '52393619'
      },
      '2024-05-13': {
        '1. open': '185.4350',
        '2. high': '187.1000',
        '3. low': '184.6200',
        '4. close': '186.2800',
        '5. volume': '72044809'
      },
      '2024-05-10': {
        '1. open': '184.9000',
        '2. high': '185.0900',
        '3. low': '182.1300',
        '4. close': '183.0500',
        '5. volume': '50759496'
      },
      '2024-05-09': {
        '1. open': '182.5600',
        '2. high': '184.6600',
        '3. low': '182.1100',
        '4. close': '184.5700',
        '5. volume': '48982972'
      },
      '2024-05-08': {
        '1. open': '182.8500',
        '2. high': '183.0700',
        '3. low': '181.4500',
        '4. close': '182.7400',
        '5. volume': '45057087'
      },
      '2024-05-07': {
        '1. open': '183.4500',
        '2. high': '184.9000',
        '3. low': '181.3200',
        '4. close': '182.4000',
        '5. volume': '77305771'
      },
      '2024-05-06': {
        '1. open': '182.3540',
        '2. high': '184.2000',
        '3. low': '180.4200',
        '4. close': '181.7100',
        '5. volume': '78569667'
      },
      '2024-05-03': {
        '1. open': '186.6450',
        '2. high': '187.0000',
        '3. low': '182.6600',
        '4. close': '183.3800',
        '5. volume': '163224109'
      },
      '2024-05-02': {
        '1. open': '172.5100',
        '2. high': '173.4150',
        '3. low': '170.8900',
        '4. close': '173.0300',
        '5. volume': '94214915'
      },
      '2024-05-01': {
        '1. open': '169.5800',
        '2. high': '172.7050',
        '3. low': '169.1100',
        '4. close': '169.3000',
        '5. volume': '50383147'
      },
      '2024-04-30': {
        '1. open': '173.3300',
        '2. high': '174.9900',
        '3. low': '170.0000',
        '4. close': '170.3300',
        '5. volume': '65934776'
      },
      '2024-04-29': {
        '1. open': '173.3700',
        '2. high': '176.0300',
        '3. low': '173.1000',
        '4. close': '173.5000',
        '5. volume': '68169419'
      },
      '2024-04-26': {
        '1. open': '169.8800',
        '2. high': '171.3400',
        '3. low': '169.1800',
        '4. close': '169.3000',
        '5. volume': '44838354'
      },
      '2024-04-25': {
        '1. open': '169.5250',
        '2. high': '170.6100',
        '3. low': '168.1511',
        '4. close': '169.8900',
        '5. volume': '50558329'
      },
      '2024-04-24': {
        '1. open': '166.5400',
        '2. high': '169.3000',
        '3. low': '166.2100',
        '4. close': '169.0200',
        '5. volume': '48251835'
      },
      '2024-04-23': {
        '1. open': '165.3500',
        '2. high': '167.0500',
        '3. low': '164.9200',
        '4. close': '166.9000',
        '5. volume': '49537761'
      },
      '2024-04-22': {
        '1. open': '165.5150',
        '2. high': '167.2600',
        '3. low': '164.7700',
        '4. close': '165.8400',
        '5. volume': '48116443'
      },
      '2024-04-19': {
        '1. open': '166.2100',
        '2. high': '166.4000',
        '3. low': '164.0750',
        '4. close': '165.0000',
        '5. volume': '68149377'
      },
      '2024-04-18': {
        '1. open': '168.0300',
        '2. high': '168.6400',
        '3. low': '166.5500',
        '4. close': '167.0400',
        '5. volume': '43122903'
      },
      '2024-04-17': {
        '1. open': '169.6100',
        '2. high': '170.6500',
        '3. low': '168.0000',
        '4. close': '168.0000',
        '5. volume': '50901210'
      },
      '2024-04-16': {
        '1. open': '171.7500',
        '2. high': '173.7600',
        '3. low': '168.2700',
        '4. close': '169.3800',
        '5. volume': '73711235'
      },
      '2024-04-15': {
        '1. open': '175.3600',
        '2. high': '176.6300',
        '3. low': '172.5000',
        '4. close': '172.6900',
        '5. volume': '73531773'
      },
      '2024-04-12': {
        '1. open': '174.2600',
        '2. high': '178.3600',
        '3. low': '174.2100',
        '4. close': '176.5500',
        '5. volume': '101670886'
      },
      '2024-04-11': {
        '1. open': '168.3400',
        '2. high': '175.4600',
        '3. low': '168.1600',
        '4. close': '175.0400',
        '5. volume': '91070275'
      },
      '2024-04-10': {
        '1. open': '168.8000',
        '2. high': '169.0900',
        '3. low': '167.1100',
        '4. close': '167.7800',
        '5. volume': '49709336'
      },
      '2024-04-09': {
        '1. open': '168.7000',
        '2. high': '170.0800',
        '3. low': '168.3500',
        '4. close': '169.6700',
        '5. volume': '42231444'
      }
    }
  }
//pull stock data from API
const getStockData = async (symbol) => {
    try {
        // const response = await axios.get(api);
        // const data = response.data["Time Series (Daily)"];

        const data = testingData["Time Series (Daily)"];
        // console.log(data);
        const mostRecentDateKey = Object.keys(data)[0];
        console.log("Most recent date key: ", mostRecentDateKey);
        const mostRecentDate = new Date(mostRecentDateKey);
        const threeDaysAgo = new Date(mostRecentDate);
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
        // const oneYearAgo = new Date(mostRecentDate);
        // oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

        console.log("Most recent date: ", mostRecentDate);
        console.log("One year ago: ", threeDaysAgo);

        const filteredData = Object.keys(data)
            .filter(dateKey => {
                const currentDate = new Date(dateKey);
                return currentDate >= threeDaysAgo && currentDate <= mostRecentDate;
            })
            .reduce((obj, dataKey) => {
                obj[dataKey] = data[dataKey];
                return obj;
            }, {});
        console.log("Filtered data: ", filteredData);
        
    } catch (err) {
        console.log("Error getting stock data: ", err);
    }
};
//(stock[0], stock[0] - 1 year)
// today is 17/4/2000
//stock[0] - 17/4


//monthly - 2000
//daily - 4/8 -> 28/8
//weekly - 4/8 -> 28/8
getStockData("AAPL");

//stock testing data
const stocks = [
    {
        symbol: "AAPL",
        open: 1,
        high: 1,
        low: 1,
        close: 1,
        change: 1,
        volume: 1,
        date: new Date()
    },
    {
        symbol: "MSFT",
        open: 2,
        high: 2,
        low: 2,
        close: 2,
        change: 2,
        volume: 2,
        date: new Date()
    },
    {
        symbol: "GOOGL",
        open: 3,
        high: 3,
        low: 3,
        close: 3,
        change: 3,
        volume: 3,
        date: new Date()
    },
    {
        symbol: "AMZN",
        open: 4,
        high: 4,
        low: 4,
        close: 4,
        change: 4,
        volume: 4,
        date: new Date()
    },
    {
        symbol: "TSLA",
        open: 5,
        high: 5,
        low: 5,
        close: 5,
        change: 5,
        volume: 5,
        date: new Date()
    }
];

//seed stock data into database
const stockSeeding = async (data) => {
    try {
        await connectToMongoDB();
        console.log("Connected to MongoDB");
        for (const singleStock of data) {
            const { symbol, open, high, low, close, change, volume, date } = singleStock;
            let stock = await Stock.findOne({ symbol: symbol });

            if (stock) {
                console.log("Stock already exists");
                stock.open.push(open);
                stock.high.push(high);
                stock.low.push(low);
                stock.close.push(close);
                stock.change.push(change);
                stock.volume.push(volume);
                stock.date.push(date);
                await stock.save();
            } else {
                console.log("Stock does not exist");
                const newStock = new Stock({
                    symbol,
                    open: [open],
                    high: [high],
                    low: [low],
                    close: [close],
                    change: [change],
                    volume: [volume],
                    date: [date]
                });
                await newStock.save();
            }
            console.log("Stock seeded successfully with symbol: ", symbol);
        }
        process.exit(0);
    } catch (err) {
        console.log("Error seeding stocks: ", err);
        process.exit(1);
    }
};

// stockSeeding(stocks);