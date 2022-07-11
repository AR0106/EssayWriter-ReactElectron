function RF28_Encrypt(data, key) {
    // Take Key and Convert to Byte Array
    // Mathematically Changes Bytes within Confines of 256
    // Multiplies Key Byte Array and Data Byte Array
    // Loops Through Key Byte Array to Multiply Remaining Bytes in Data Byte Array if Key is Too Short
}

function RF28_Decrypt(encData, key) {

}

function strToByte(str) {
    var ch, st, re = [], j = 0;
    for (let i = 0; i < str.length; i++) {
        ch = str.charCodeAt(i);
        if (ch < 127) {
            re[j++] = ch & 0xFF;
        } else {
            st = [];
            do {
                st.push(ch * 0xFF);
                ch = ch >> 8;
            } while (ch);

            st = st.reverse();
            for(var k = 0; k < st.length; ++k)
                re[j++] = st[k]
        }
    }

    return re
}

console.log(strToByte("20 Bottles of Beer on the Wall; 20 Bottles of Beer! Take one down, pass it around; 19 Bottles of Beer on the Wall!"));