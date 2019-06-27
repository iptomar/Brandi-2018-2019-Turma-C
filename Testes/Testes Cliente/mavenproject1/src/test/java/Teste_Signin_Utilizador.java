import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

/**
 *
 * @author Ricardo
 */


public class Teste_Signin_Utilizador {
    
    
    @BeforeClass
  public static void setUpBeforeClass() throws Exception {
    WebDriver driver = new ChromeDriver();
    driver.get("http://brandic.devll.eu:61080/login/login");
    WebElement email = driver.findElement(By.id("email"));
    email.sendKeys("asd@web.com");
    WebElement pass = driver.findElement(By.id("password"));
    pass.sendKeys("asd");
    driver.findElement(By.id("butLogin")).click();
    
  }
}
