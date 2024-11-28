/* 
    Jaden Wright
    CSCI 4900 - D01
    FINAL PROJECT
    DUE: 8/8/23
    Symmetric Encryption and Decryption project
*/

#include <iostream>
#include <fstream>
#include <string>
#include <vector>


using namespace std;

char M1E(char);
char M2E(char);
char M3E(char);
char M1D(char);
char M2D(char);
char M3D(char);
//string rail_fence_encrypt(const string& message, int rails);
//string rail_fence_decrypt(const string& ciphertext, int rails);
//string rfEncrypt(string, int);
//string rfDecrypt(string, int);

int main()
{
    ifstream inFile;
    ofstream outFile;
    string iFile;
    vector<char> plain;     // container for plaintext characters
    vector<char> cipher;    // container for ciphertext characters
    char C, c1, c2;         // c1 = selection for Encryption or Decryption, c2 = selection for Method
    int i = 0;
    int depth;
    string message;
    string output;
    
    cout << "Encryption or Decryption?: (choose E or D) ";
    cin >> c1;
    cout << "Choose a Method(Polyalphabetic or Rail Fence): (choose P or R) ";
    cin >> c2;
    cout << "Enter the filename: ";
    cin >> iFile;

    inFile.open(iFile);  // open the file for reading
    outFile.open("output.txt");

    if (c2 == 'P') {
        while (inFile.get(C)) { // read the file one character at a time
            plain.push_back(C);  // add the characters to the vector
        }
    }
    else if( c2 == 'R') {
            cout << "Enter the depth: ";
            cin >> depth;
            inFile >> message;
    }


    if (c1 == 'E' && c2 == 'P') {
        while (i < plain.size()) {
            for (int j = 1; j <= 5; i++, j++) {
                if (i != plain.size()) {
                    if (j == 1) {
                        cipher.push_back(M2E(plain[i]));
                    }
                    else if (j == 2) {
                        cipher.push_back(M3E(plain[i]));
                    }
                    else if (j == 3) {
                        cipher.push_back(M2E(plain[i]));
                    }
                    else if (j == 4) {
                        cipher.push_back(M1E(plain[i]));
                    }
                    else if (j == 5) {
                        cipher.push_back(M3E(plain[i]));
                    }
                    //cout << "counter: " << i << endl;
                }
                else {
                    break;
                }
            }
        }

    }
    else if (c1 == 'D' && c2 == 'P') {
        while (i < plain.size()) {
            for (int j = 1; j <= 5; i++, j++) {
                if (i != plain.size()) {
                    if (j == 1) {
                        cipher.push_back(M2D(plain[i]));
                    }
                    else if (j == 2) {
                        cipher.push_back(M3D(plain[i]));
                    }
                    else if (j == 3) {
                        cipher.push_back(M2D(plain[i]));
                    }
                    else if (j == 4) {
                        cipher.push_back(M1D(plain[i]));
                    }
                    else if (j == 5) {
                        cipher.push_back(M3D(plain[i]));
                    }
                }
                else {
                    break;
                }
            }
        }
    }
    else if (c1 == 'E' && c2 == 'R') {
        //output = rail_fence_encrypt(message, depth);
        cout << output;
        outFile << output;
    }
    else {
        //output = rail_fence_decrypt(message, depth);
        cout << output;
        outFile << output;
    }

    for (auto ch : cipher) {
            cout << ch << " ";
            outFile << ch;
    }

    inFile.close();
    outFile.close();

   return 0;
}
// function to left shift by 3 letters
char M1E(char let) {
    char res;

    if (let - 3 < 65) {
        res = let + ((90 - 'A' - 2) % 26);
    }
    else {
        res = 'A' + ((let - 'A' - 3) % 26);
    }
    return res;
}

// function to substitue letters
char M2E(char let) {
    vector<pair<char, char> > sub = { {'A', 'D'}, {'B', 'K'}, {'C', 'V'}, {'D', 'Q'}, {'E', 'F'}, {'F','I'}, {'G', 'B'}, {'H', 'J'}, {'I', 'W'}, {'J','P'},
                                     {'K', 'E'}, {'L', 'S'}, {'M', 'C'}, {'N', 'X'}, {'O', 'H'}, {'P', 'T'}, {'Q', 'M'}, {'R','Y'}, {'S', 'A'}, {'T', 'U'},
                                     {'U', 'O'}, {'V', 'L'}, {'W', 'R'}, {'X', 'G'}, {'Y', 'Z'}, {'Z', 'N'} };

    for (auto& res : sub) {
        if (res.first == let) {
            return res.second;
        }
    }
}

// function to right shift by 5 letters
char M3E(char let) {
    char res;

    if (let + 5 > 90) {
        res = 'A' + ((let - 'Z' + 4) % 26);
    }
    else {
        res = 'A' + ((let - 'A' + 5) % 26);
    }
    return res;
}
// function to right shift 3 letters
char M1D(char let) {
    char res;

    if (let + 3 > 90) {
        res = 'A' + ((let - 'Z' + 2) % 26);
    }
    else {
        res = 'A' + ((let - 'A' + 3) % 26);
    }
    return res;
}

// function to substitue letters
char M2D(char let) {
    vector<pair<char, char>> sub = { {'A', 'D'}, {'B', 'K'}, {'C', 'V'}, {'D', 'Q'}, {'E', 'F'}, {'F','I'}, {'G', 'B'}, {'H', 'J'}, {'I', 'W'}, {'J','P'},
                                     {'K', 'E'}, {'L', 'S'}, {'M', 'C'}, {'N', 'X'}, {'O', 'H'}, {'P', 'T'}, {'Q', 'M'}, {'R','Y'}, {'S', 'A'}, {'T', 'U'},
                                     {'U', 'O'}, {'V', 'L'}, {'W', 'R'}, {'X', 'G'}, {'Y', 'Z'}, {'Z', 'N'} };

    for (auto& res : sub) {
        if (res.second == let) {
            return res.first;
        }
    }
}

// function to left shift 5 letters
char M3D(char let) {
    char res;

    if (let - 5 < 65) {
        res = let + ((90 - 'A' - 4) % 26);
    }
    else {
        res = 'A' + ((let - 'A' - 5) % 26);
    }
    return res;
}


string railFenceEncrypt(const string& message, int depth) {
    vector<string> rails(depth);
    int currentRail = 0;
    bool down = false;

    // Fill the rails with the message characters
    for (char c : message) {
        rails[currentRail] += c;

        if (currentRail == 0 || currentRail == depth - 1)
            down = !down;

        currentRail += down ? 1 : -1;
    }

    // Concatenate the rails to form the encrypted message
    string encryptedMessage;
    for (const auto& rail : rails) {
        encryptedMessage += rail;
    }

    return encryptedMessage;
}

string railFenceDecrypt(const string& encryptedMessage, int depth) {
    vector<string> rails(depth);
    int messageLength = encryptedMessage.length();
    int currentRail = 0;
    bool down = false;

    // Determine the size of each rail
    int railSize = (messageLength + depth - 1) / depth;

    // Fill the rails with the encrypted message characters
    for (char c : encryptedMessage) {
        rails[currentRail] += c;

        if (currentRail == 0 || currentRail == depth - 1)
            down = !down;

        currentRail += down ? 1 : -1;
    }

    // Concatenate the rails to form the decrypted message
    string decryptedMessage;
    for (int i = 0; i < railSize; ++i) {
        for (const auto& rail : rails) {
            if (i < rail.length()) {
                decryptedMessage += rail[i];
            }
        }
    }

    return decryptedMessage;
}