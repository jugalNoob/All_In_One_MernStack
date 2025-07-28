module.exports = function userInfoLogger(schema) {
  schema.methods.generateUserInfomration = async function (
    href,
    ip,
    hostname,
    pathname,
    protocol,
    connection,
    host,
    secChUaPlatform,
    acceptLanguage,
    secChUa
  ) {
    const token = {
      href,
      'IP Address': ip,
      Host: hostname,
      Pathname: pathname,
      Protocol: protocol,
      Connection: connection,
      'Host Header': host,
      'Sec-CH-UA-Platform': secChUaPlatform,
      'Accept-Language': acceptLanguage,
      'Sec-CH-UA': secChUa
    };

    this.address = this.address || [];
    this.address.push({ add: JSON.stringify(token) });
    await this.save();
    return token;
  };
};




// studentSchema.methods.generateUserInfomration = async function (href, ip, hostname, pathname, protocol, connection, host, secChUaPlatform, acceptLanguage, secChUa) {
//     const token = {
//         href,
//         'IP Address': ip,
//         Host: hostname,
//         Pathname: pathname,
//         Protocol: protocol,
//         Connection: connection,
//         'Host Header': host,
//         'Sec-CH-UA-Platform': secChUaPlatform,
//         'Accept-Language': acceptLanguage,
//         'Sec-CH-UA': secChUa
//     }; // Example token, this should be generated securely
//     this.address.push({ add: JSON.stringify(token) });
//     await this.save();
//     return token;
// };
