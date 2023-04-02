#include<IRremote.h>  
#include "DHT.h"
#define Type DHT11
#define ledR 8
#define ledV 7
//
int sensorPin = 2;
DHT objetDHT11(sensorPin, Type);
float humidite;
float tempC;
float tempF;
int setime = 500;
int delayTime = 1000;

void setup() {
 Serial.begin(9600);
 objetDHT11.begin();
 delay(setime);
 pinMode(ledV,OUTPUT);
 pinMode(ledR,OUTPUT);
}
void loop() {
  humidite = objetDHT11.readHumidity();
  tempC = objetDHT11.readTemperature();
  tempF = objetDHT11.readTemperature(true);
  delay(delayTime);
  if(tempC <= 26 ){
    ledOn(ledV);
    ledOff(ledR);
  }
  else{
    ledOn(ledR);
    ledOff(ledV);
  }

  Serial.print(tempC);
  Serial.println(humidite);

  delay(500);
}

void ledOn(int numLed){
  digitalWrite(numLed, HIGH);
}
void ledOff(int numLed){
  digitalWrite(numLed, LOW);
}