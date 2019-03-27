/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.mycompany.mavenproject1;

import org.openqa.selenium.By;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.chrome.ChromeDriver;

/**
 *
 * @author LittleChinese
 */
public class Teste {
    public static void main(String[] args) throws InterruptedException {
                // Optional, if not specified, WebDriver will search your path for chromedriver.
  //System.setProperty("webdriver.chrome.driver", "/path/to/chromedriver");

  WebDriver driver = new ChromeDriver();

     
      driver.get("http://brandic.devll.eu:61080/login/login");
        driver.findElement(By.id("email")).sendKeys("teste123456@ipt.pt"); 
        driver.findElement(By.id("password")).sendKeys("123456");
         driver.findElement(By.id("butLogin")).click();


//  driver.quit();
    }
}


/*TRABALHO DO LOGIN
  WebDriver driver = new ChromeDriver();
      driver.get("http://brandic.devll.eu:61080/login/login");



        WebElement a = driver.findElement(By.id("email")); 
        a.sendKeys(Keys.CONTROL + "a");
        a.sendKeys(Keys.DELETE);
        a.sendKeys("teste123456@ipt.pt");
        WebElement b=driver.findElement(By.id("password"));
        b.sendKeys(Keys.CONTROL + "a");
        b.sendKeys(Keys.DELETE);
        b.sendKeys("123456");

*/


   // driver.findElement(By.xpath("//label[@id='login()']")).click();

/*textBox.clear();
    textBox.sendKeys(newText);
*/

/*INSCRICAO NO FACEBOOK 
WebDriver driver = new ChromeDriver();
      driver.get("https://www.facebook.com/");
WebElement firstname = driver.findElement(By.name("firstname"));
firstname.sendKeys("Vanessa");
driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
driver.findElement(By.name("lastname")).sendKeys("Ferreira");
driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
driver.findElement(By.name("reg_email__")).sendKeys("vanessatferreira@msn.com");
driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);

driver.findElement(By.name("reg_passwd__")).sendKeys("123456");
driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);
driver.findElement(By.name("reg_email_confirmation__")).sendKeys("vanessatferreira@msn.com"); //VER ISTO
driver.manage().timeouts().implicitlyWait(30, TimeUnit.SECONDS);

*/


/*LOGIN FEITO

      driver.get("https://www.facebook.com/");
        driver.findElement(By.id("email")).sendKeys("vanessatferreira@msn.com"); 
        driver.findElement(By.id("pass")).sendKeys("*******");
        driver.findElement(By.xpath("//label[@id='loginbutton']")).click();   




*/

/*PRIMEIRO TESTE DE FACEBOOK
WebDriver driver = new ChromeDriver();

        driver.get("https://www.facebook.com/");

driver.manage().window().maximize();

driver.findElement(By.xpath(".//*[@id='email']")).sendKeys("your email");

driver.findElement(By.xpath(".//*[@id='pass']")).sendKeys("your password");

//click for login
driver.findElement(By.xpath("//label[@id='loginbutton']/input")).click();

//Mouse over on logOut drop down menu icon,then click logout
WebElement mouseOverEle = driver.findElement(By.id("pageLoginAnchor"));

Actions actions = new Actions(driver);

actions.moveToElement(mouseOverEle).click().perform();

//click for logout
driver.findElement(By.xpath("//input[@value='Log Out']")).click(); 

 */



/* FUNCIONA exemplo google
 WebDriver driver = new ChromeDriver();
  driver.get("http://www.google.com/xhtml");
  Thread.sleep(5000);  // Let the user actually see something!
  WebElement searchBox = driver.findElement(By.name("q"));
  
  searchBox.sendKeys("gmail");
  searchBox.submit();
  Thread.sleep(5000);  // Let the user actually see something!
  
  driver.quit();
    }
    
 */