/*
Good morning! Here's your coding interview problem for today.

This problem was recently asked by Google.

Given a list of numbers and a number k, return whether any two numbers from the list add up to k.

For example, given [10, 15, 3, 7] and k of 17, return true since 10 + 7 is 17.

Bonus: Can you do this in one pass?

*/
#include <bits/stdc++.h>
using namespace std;

void hashMapImplementation(int array[], int size, int num) 
{ 
    unordered_set<int> set1; 
    for (int i = 0; i < size; i++) 
    { 
        int key = num - array[i]; 
  
        if (key>= 0 && set1.find(key) != set1.end()) 
            cout << "pair with the sum as : " << num << " is : " << array[i] << ", " << key;
            cout << endl;
  
        set1.insert(array[i]); 
    } 
} 

int main() 

{ 
    int array[] = {2,4,6,8,10}; 
    int num = 18;
    int size= sizeof(array) / sizeof(array[0]);
    hashMapImplementation(array, size, num); 
    return 0; 
} 
