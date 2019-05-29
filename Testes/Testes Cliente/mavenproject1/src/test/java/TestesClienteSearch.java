
import org.junit.AfterClass;
import org.junit.BeforeClass;
import org.junit.Test;
import org.openqa.selenium.By;
import org.openqa.selenium.JavascriptExecutor;
import org.openqa.selenium.Keys;
import org.openqa.selenium.WebDriver;
import org.openqa.selenium.WebElement;
import org.openqa.selenium.chrome.ChromeDriver;

/**
 *
 * @author Ricardo
 */
public class TestesClienteSearch {

    @BeforeClass
    public static void setUpBeforeClass() throws Exception {
        WebDriver driver = new ChromeDriver();
        driver.get("http://brandic.devll.eu:61080/#/datasheet/create");
        //Designação do objeto
        WebElement searchBox = driver.findElement(By.name("searchBox"));
        searchBox.sendKeys("Ola Mundo");
        searchBox.sendKeys(Keys.ENTER);
        
        WebElement divInfo = driver.findElement(By.className("card-title"));
        divInfo.click();
        // driver.close();
    }

    @Test
    public void testSimple() throws Exception {
        WebDriver driver = new ChromeDriver();

        driver.get("http://brandic.devll.eu:61080/signup/signup");

    }

}