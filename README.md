
# Vidyut Rakshak
--- 
<p align="center">
    <img src="https://www.thinkright.me/wp-content/uploads/2018/11/28.png" alt="OCR" width="200"  height="165">
</p>

<h3 align="center">Optical Character Recognition (OCR)</h3>

## FAULT LINE DETECTION IN TRANSMISSION SYSTEM


# Team Abyudaya:
We are team Abhudaya from  Amrita Vishwa Vidyapeetham,Kollam currently pursuing  Electronics and Communication Engineering.<br>
 Esarapu Dilip Vignesh<br>
 Vedhakrishna  Yarasuri<br>
 Dhumsapuram Saikrishna Reddy<br>
 Gowtham Kishore Indukuri<br>       
	
# -- When Something is important enough , we do it even if the odds are not in favour.  
       








ABOUT DOCUMENTATION:

This documentation describes the solution we have answered for detecting the faulty lines in transmission line systems. We have a good and better optimal solution to detect the system. We had worked out and designed a better system implementation used to sort out the problem by using affordable circuit design interfacing with user friendly  web applications deployed with ML integrated techniques, and data transforming through better communication systems.
INTRODUCTION:
                     The trends in technology have been increasing very fast and providing keen ideas to vast solutions.Overline  breaking is an issue that causes problems for KSEB in terms of providing uninterrupted power supply to the households.The line breakage could be due several factors such as tolerances or fluctuations in current and   voltages,  natural factors such as high winds, falling trees  or due to other reasons like corrosion.The transmission line faults in transmission system are frequent and the detection of the faulty line is not handy task.  These kinds of damages put the people in risk, so we need to boost up our transmission systems to send the information about the faulty lines.
We are going to solve this issue by detecting, classifying and locating the fault occured in the Transmission Power Systems. We are also going to use an Electronic Embedded System in order to collect the sensor data and send it to a respective Website for Analysis alerting !!!.
Goals:
1.Hardware Integration and Development
2.Website Development 
3.Machine Learning Modelling
System Architecture
							Fig: Block Diagram 
 The above block diagram shows schematic representation of  the systems.Here the sensor data is collected from voltage sensors and current sensors ,from high voltage transmission lines and the location (longitude,latitude values) is  collected using GPS Module.All these sensor data from sensors is collected to the PIC16F877A microcontroller. The power to the microcontroller is supplied by stepping down the high 220vAC to 5v DC using an SMPS(Switch Power Mode Supply) Module. Then this sensor data is sent to a Machine learning Deployed Server using a GSM(Global System for Mobile Communications) module through a GPRS(General Packet Radio Service) Network. After this the user needs to register in the respective website and log into it and check his details.The machine learning model will analyze the sensor data and detect,classify and locate the fault in the power lines and alert the user in the Department. Users can inform the worker about the type and location of fault and make the fault repair. 
Hardware Integration and Deployment                  
Schematic Design of Hardware             
 
	 	 	 	
PIC16F877A Microcontroller
We have used the PIC16F877 microcontroller because of its wide range of applications in diverse fields since it is readily available. It also has around 40 pins with a maximum of three functions per pin which makes it much easier to use as compared to others with limited pins and a high number of functions per pin. It’s optimal cost-to-performance ratio also brings us an added advantage.
AC voltage Measurement using PIC16F877A Microcontroller

To measure 220V AC, you need to step down this voltage. Because microcontrollers can't measure voltage greater than 5V. If you give voltage more than 5V to the analog input of the microcontroller, it will get damaged permanently. To assure protection of microcontrollers, you will need to step down 220 volt AC into AC  voltage whose peak value should be less than 5V. For example , 220V AV means RMS voltage and its peak value is equal to 311 volt. similarly you have to step down high AC voltage in such a way that its peak value should not be greater than 5 volt.
Potential Transformer can also be used to step down 220 Alteration voltage.But why do you want to spend more money? when you can do this with the help of cheap operational amplifiers and few resistors. Difference amplifier methods are more economical than potential transformers when you want to step down voltage less than 400 volt AC.
Difference Amplifier circuit
Difference amplifier is used to amplify voltage from two voltage levels.In case of Alternating voltage we have two voltage levels one is positive with respect to neutral and other is negative with respect to neutral.You can adjust the gain of difference amplifier according to our requirement by selecting proper  values of resistors.In this project gain is equal to :
Gain=  R8/(R1+ R2+ R3)  ;
In Alternating voltage case the second voltage level is zero. Because during positive cycle and negative cycle other side is considered zero or neutral. So output voltage will be
vout = gain * Vinput;
Difference amplifier to step down voltage
In Above picture, resistors R1, R2, R3, R4, and R5 have high values which do not allow high voltage to appear across the op-amp. Because high input resistors are used that’s why microampere current will be low and this way power loss will be in kilowatts. According to difference amplifier gain formula our gain will be:
gain=   (22K)/( 1.2M + 1.2M + 2.2K) = 0.0091
NOTE:  you must make calculations according to the peak value of the sine wave. Because peak voltage is the maximum voltage input to microcontroller analog pin.So with a .0091 gain, with respect to peak voltage of sine wave output voltage from op-amp is :
                                      Vout = .0091 * 311 = 2.8301 volt (peak output voltage)
As you see above figure we have connected other terminal of R7 to 5 volt instead of  ground as we do while using difference amplifier in many applications. R7 resistor is used to increase DC voltage level op-amp output. Sine waves have zero DC voltage level and  negative voltage cycle. Microcontrollers can not read negative voltage.So we increase the DC level of sine wave by 5 volt.In this way negative voltage will not appear across  microcontrollers. Now output peak voltage from op-amp is 5 + 2.8301 = 7.8301 volt. But as I have mentioned , microcontrollers can not measure voltage greater than 5 volt.So as shown in above figure we have used voltage divider to divide voltage by 2.Hence output voltage is:
                                                            Vout = 7.8301/2 =  3.90155;
Capacitors C1, C2, and C3 are used to filter harmonics from input voltage and to provide protection to microcontrollers from harmonics.Now AN pin can be connected to microcontroller analog pin to measure voltage easily.
 
 
mean primary current of the transformer is 100 Amp and the secondary current is 10 Amp. you can not use this current transformer to measure more than 100 Amp.
By measuring the secondary side low current, we can easily convert it into primary current value by using the current ratio formula. I will discuss in the latter part of this discussion how to use this step-down ratio in the programming part.
 
How to convert current into voltage?
We cannot measure current directly. Firstly, we convert the secondary side current into voltage. We can use a known value of resistor load. We measure the voltage across this known resistor. After that, we can convert this measured voltage into the current. We can use ohm’s law formula to convert the voltage into the current.
V=IR
I = V/R
As you can see in this circuit diagram, we use an R1 load resistor to convert current into voltage. In this circuit, a voltage divider is used. But we can also use an operational amplifier to step down the voltage across the load resistor.

How to Measure the Secondary Side current of CT
Now we will see how to sense ac current with the secondary side. There are many methods to measure low alternating current; you can also measure it using AC ammeter. But if you want to perform some control operation and want to send a measured current value to another place. You have to use some kind of intelligent system.
For example, you want to make a current protection circuit and circuit specification are followings
if the current flowing through a line is greater than 100 Ampere, a control action  should be performed to operate a relay
Current > 100 Ampere , Relay = open
Otherwise if current < 100 Ampere , Relay = close
To make such an intelligent system, we may use analog and digital electronics, but it is better to use digital electronics as far as cost is a concern. We will use a PIC microcontroller to measure the alternating current that is PIC16F877A.
Hardware components
PIC16f877A
CT
An operational amplifier as a Difference amplifier
AC current measurement circuit using pic microcontroller
The operational amplifier acts as a voltage level shifting circuit or difference amplifier. You can go through this guide on AC voltage measurement to understand its working.
Difference amplifier Circuit
To measure ac current with a pic microcontroller, we have to use the ADCmodule of PIC microcontroller. To use the ADC module,  we will convert current into voltage form by using a .1 ohm shunt resistor across CT and we will measure this voltage drop across the shunt resistor. Then this voltage drop can be easily converted into current again. For example voltage drop across .1 ohm shunt resistor =8v
then-current according to ohm law
                                                           V=IR
                                                          I=V/R
                                                          I=8/.1=8A
but the problem is the ADC of the pic microcontroller can never measure voltage greater than 5 volts. Therefore,  to solve this problem, we can use the difference amplifiers. Because, by adjusting the gain of the difference amplifier,  we can reduce voltage lower than 5 volts. The following diagram shows the circuit of CT and difference amplifier interfacing. you can use any op-amp such as LM741,TL074.

Circuit diagram with pic microcontroller
This is a circuit diagram of interfacing the current sensor with a pic microcontroller. Connect the secondary side of  CT to the points shown on the schematic. After that, Connect the shunt resistor in parallel with the current sensor. The difference amplifier circuit converts voltage below 5-volt magnitude.  It  also shifts the level of ac voltage from the negative side to the positive side. Connect output of difference amplifier with RA1 or analog channel one of PIC16F877A.

 


Interfacing GPS Module with PIC16F877A Microcontroller

GPS is the short-form of the Global Positioning System. It is a system which provides accurate Altitude, Latitude, Longitude, UTC time and much more information, which are taken from 2, 3, 4 or more satellites. To read data from GPS, we need some Microcontroller.We have selected the G7020 GPS module which is made by U-blox. We will receive Longitude and latitude of a particular position from satellite .So here we will interface GPS with PIC16F877A microcontroller by microchip.
U-Blox-G7020 GPS module, receive and transmit data using UART. PIC16F877A consists one USART driver inside the chip, we will receive data from GPS module by USART, so a cross connection will be made from the microcontroller Rx pin to GPS’s Tx pin and USART Receive pin connected across GPS’s Transmit pin.The uBlox-G7020 has color code for the pins. The Positive or 5V pin is in Red color, the Negative or GND pin is in Black color and the Transmit pin is in Blue color.
Getting Location Data from GPS:
Let’s see how to interface GPS using USART .The Module will transmit data in multiple strings at 9600 Baud Rate. If we use an UART terminal with 9600 Baud rate, we will see the data received by GPS.
GPS module sends the Real time tracking position data in NMEA format (see the screenshot above). The NMEA format consists of several sentences, in which four important sentences are given below. More detail about the NMEA sentence and its data format can be found here.
$GPGGA: Global Positioning System Fix Data
$GPGSV: GPS satellites in view
$GPGSA: GPS DOP and active satellites
$GPRMC: Recommended minimum specific GPS/Transit data
This is the data received by GPS when connected on 9600 baud rate.
$GPRMC,141848.00,A,2237.63306,N,08820.86316,E,0.553,,100418,,,A*73
$GPVTG,,T,,M,0.553,N,1.024,K,A*27
$GPGGA,141848.00,2237.63306,N,08820.86316,E,1,03,2.56,1.9,M,-54.2,M,,*74
$GPGSA,A,2,06,02,05,,,,,,,,,,2.75,2.56,1.00*02
$GPGSV,1,1,04,02,59,316,30,05,43,188,25,06,44,022,23,25,03,324,*76
$GPGLL,2237.63306,N,08820.86316,E,141848.00,A,A*65

When we use a GPS module for tracking any location, we only need coordinates and we can find this in $GPGGA string. Only $GPGGA (Global Positioning System Fix Data) String is mostly used in programs and other strings are ignored. 
$GPGGA,141848.00,2237.63306,N,08820.86316,E,1,03,2.56,1.9,M,-54.2,M,,*74
What is the meaning of that line?
Meaning of that line is:-
1. String always starts with a “$” sign
2. GPGGA stands for Global Positioning System Fix Data
3. “,” Comma indicates the separation between two values
4. 141848.00: GMT time as 14(hr):18(min):48(sec):00(ms)
5. 2237.63306,N: Latitude 22(degree) 37(minutes) 63306(sec) North
6. 08820.86316,E: Longitude 088(degree) 20(minutes) 86316(sec) East
7. 1 : Fix Quantity 0= invalid data, 1= valid data, 2=DGPS fix
8. 03 :  Number of satellites currently viewed.
9. 1.0: HDOP
10. 2.56,M : Altitude (Height above sea level in meter)
11. 1.9,M : Geoids height
12. *74 : checksum
So we need No. 5 and No.6 to gather information about the module location or, where it is located.
Steps to Interface GPS with PIC Microcontroller:-
Set the configurations of the microcontroller which include Oscillator configuration.
Connect the GPS module to the microcontroller using USART.
Initialize the system USART in continuous receive mode, with 9600 baud rate
Take two character arrays depending on the Length of Latitude and Longitude.
Receive one character bit at a time and check whether it is started from $ or not.
If $ Receive then it is a string, we need to check GPGGA, this 5 letters and the comma.
If it is GPGGA, then we will skip the time, and look for the Latitude and Longitude, We will store the Latitude and Longitude in two character arrays until N (North) and E (East) are not received.

Using a SIM900A(GSM) Module to send Sensor data to a Website
 
In our scenario,we want to be able to monitor the current and the voltage values   and to see the data on our web page. If at all there isn't a Wi-Fi signal, this is where the SIM900A GSM module comes in handy. The SIM900A GSM module is able to send SMS messages and connect to the internet and send data. In our case, it's sending current and voltage data.
 
First, power is applied and the microcontroller goes through some configuration and initialization functions.A program can then be written  to open GPRS and connect to the GPRS network. Now the module's IP address can be known and the gsm_send_data function can be  called to send the data from the sensor.We can code to send the required current and voltage values through the GSM module.
Everything is done with ASCII commands that begin with "AT."To send commands to the GSM module, we used  the PIC's UART .
The AT+HTTPINIT command initializes the HTTP service. This command should be sent first before starting the HTTP service.
The AT+HTTPPARA command sets up HTTP parameters for the HTTP call.

 
 
Website Development and Implementation                      
In the powerline breakage detection  project,  we have created a login system for the user interface. This is useful in interaction in order to know about fault detection. Whenever a new user is going to use this system, he needs to register(or) Sign Up and enter his respective details in it. This system will check the details of the new user in the existing database and a user can generate a new password with his department ID which allows  him to the home page if they are correct . Web page gives the information about the fault powerline and location of this fault. This system will give the information about the type of fault. This web based system is connected to the machine learning  programs in order to give the details about the fault Detection, classification and Location. A user can find the location of the fault and the worker available near to the fault. Users can inform the worker about the type and location of fault and make the fault repair. 
Login System working
         		   
				      Fig: Register Page
            Fig: Login Page
        
				         Fig: Account Settings
           
				   Fig: The Main Page ( Error Viewer )
 
The basic requirement needed to build this system is MongoDB database, Nodejs, Bootstrap. First we need to create a basic login form using login.html file. 
Html is used for the basic web page login and register page. Bootstrap is a frontend framework which we used for web page designing. This is used for the easier and faster creation of web pages.  In this system, the password is encrypted. This password is secured with the passport software. Look of the webpage gets more attractive using features in the frontend framework. For backend framework, node.js is used in this system. Node.js allows the creation of Web servers and networking tools using JavaScript and a collection of "modules" that handle various core functionalities. Node.js is an open source and executes javascript in webbrowser. When a user is logged into the webpage, his details are tested with the database from the Electrical department. For this,MongoDB is used . MongoDB is a document-oriented NoSQL database used for high volume data storage. MongoDB makes use of collections and documents. From these collection sets, details of the user are verified and allowed to webpage with his own credentials.

Machine Learning And Deployment :-                     
We have used ANN(Artificial neural networks) as our Machine learning Algorithm which gave us pretty good results and to write the algorithm we have used tensorflow. We have made our own dataset with which we acquired 94.5% accuracy.
The main objective of machine learning concept is satisfaction when it is working in a production environment. With this intuition we have converted the python model to javascript model ( JSON ) using tensorflow.js converter. Later this json model will be used in further deployment scenarios. The Json model is deployed to the server so that the hardware can make api calls to the server requesting for the model prediction. In this way we can able to apply ML techniques to hardware to get required results.
ANN Algorithms and Training:-
Artificial neural networks (ANNs), usually simply called neural networks (NNs), are computing 
systems vaguely inspired by the biological neural neworthat constitute animal brains.
An ANN is based on a collection of connected units or nodes called artificial neurons, which 
loosely model the neurons in a biological brain. Each connection, like the synapses in a 
biological brain, can transmit a signal to other neurons. An artificial neuron that receives a signal 
then processes it and can signal neurons connected to it. The "signal" at a connection is a real 
number, and the output of each neuron is computed by some non-linear function of the sum of its 
inputs. The connections are called edges. Neurons and edges typically have a weight that adjusts 
as learning proceeds. The weight increases or decreases the strength of the signal at a connection. 
Neurons may have a threshold such that a signal is sent only if the aggregate signal crosses that 
threshold. Typically, neurons are aggregated into layers. Different layers may perform different 
transformations on their inputs. Signals travel from the first layer (the input layer), to the last 
layer (the output layer), possibly after traversing the layers multiple times.

                
Fig: Neural Network

TensorFlow. is a free and open-source software library for dataflow and differentiable programming across a range of tasks. It is a symbolic math library, and is also used for machine learning applications such as neural networks. It is used for both research and production at Google.

We have used ANN and tensorflow to classify the type of the fault from the received data from the GSM module.


     Fig:  Training Accuracy : 94.2% 
        Epochs : 18
We have created our own dataset with two features and two classes . Due to the lack of the dataset we have done this.


             
			Deployment
In this section we present the concept of deployment of the model. The machine learning model trained using tensorflow is a python object and will be converted to JSON object which can be later used to deploy in the server. The converted JSON model consists of details regarding the layers of the neural network and its corresponding weights. These details will be used for making predictions on the server. We need to import the tensorflow js module for node js and load the layers and corresponding weights from the json object using tensorflow.js functions. Later we can able to make predictions using apis.  

We have implemented Rest Api service for this work. Using the Express module we are able to create routes and api. The hardware would make GET requests to the server to the route which we created and will pass the voltage and current readings. Later these readings are used for making inferences from the server. The server will make inference from the obtained readings from the api. If the prediction is anomaly then the server responds with the anomaly message or else with a normal message. ( We are facing a problem in loading the model ).


Fig : The model response to the input data sent by the hardware
According to the results of the server, i.e if the anomaly was detected then the hardware will call for another api sending its location coordinates and the error name and description respectively and this data will be stored in mongodb and later used in displaying in the web application.


Fig : The error location has been saved to the Mongodb Database.


Fig : The error details from the database displayed onto the web application.
 
The basic requirement needed to build this system is MongoDB database, Nodejs, Bootstrap. First we need to create a basic login form using login.html file. 
Html is used for the basic web page login and register page. Bootstrap is a frontend framework which we used for web page designing. This is used for the easier and faster creation of web pages.  In this system, the password is encrypted. This password is secured with the passport software. Look of the webpage gets more attractive using features in the frontend framework. For backend framework, node.js is used in this system. Node.js allows the creation of Web servers and networking tools using JavaScript and a collection of "modules" that handle various core functionalities. Node.js is an open source and executes javascript in webbrowser. When a user is logged into the webpage, his details are tested with the database from the Electrical department. For this,MongoDB is used . MongoDB is a document-oriented NoSQL database used for high volume data storage. MongoDB makes use of collections and documents. From these collection sets, details of the user are verified and allowed to webpage with his own credentials.

Advantages:                       
Using this system we can decrease the time in finding the fault, classify, locate  the respective transmission line and send the accurate fault  area location to the operator. Powerback up to the system is done by using a rechargeable battery. And the user’s interface is easily accessible and secured for the respective users of the department. This can also reduce the inappropriate disturbances of power cuts for large amounts of time for the people staying in the surrounding areas of the fault.
Technologies Used:
Electronics:
→ PIC Microcontroller and Sensors
→ SMPS(step down high voltage)
→ GSM (transfer sensor data)
→ GPS(location of fault)

Machine learning:
→ANN and  Logistic regression
→ Tensorflow
→ Tensorflow js
→ API

Website:
→ HTML
→ Node.js
→ mongoDB
→ Bootstrap,CSS
→ Javascript

Conclusion:
We can use this  fault detection system anywhere using the website, the UI is enabled and secured as well ,electronics will be cost efficient and user friendly , the detection and alert system is done using software tools. We are working to improve this system by cutting off the power supply of the fault detected  transmission line by using relay modules in order to prevent others from getting harm from high voltage lines and Alerting with Buzzer. In future,our model can be extended by using  network connecting protocols like Zigbee and wifi which further helps decrease in the electronic modules.












