const express = require('express');
const { Builder, By, Key, until } = require('selenium-webdriver');
const { exec } = require('child_process');
const chrome = require('selenium-webdriver/chrome');
const path = require('path');

const dataJson = require('./data.json');

const app = express();

const port = 5000;

const downloadPath = path.resolve(__dirname, 'downloads');

const options = new chrome.Options();
options.setUserPreferences({
  'download.default_directory': downloadPath,
  'download.prompt_for_download': false,
  'download.directory_upgrade': true,
  'safebrowsing.enabled': true,
  'printing.print_preview_sticky_settings.appState': JSON.stringify({
    recentDestinations: [{
      id: 'Save as PDF',
      origin: 'local',
      account: '',
    }],
    selectedDestinationId: 'Save as PDF',
    version: 2,
  }),
  'savefile.default_directory': downloadPath,
  'printing.default_directory': downloadPath,
});

const data = dataJson.content.map((item) => {
  const newItem = {
    id: item.report_request_id,
    farmName: item.report.eu[0].property_data.farm_name,
  }

  return newItem;
});

const test = [data.slice(0, 2)];

app.get('/generate-pdf', async (req, res) => {
  try {
    const baseUrl = "http://localhost:3000/";
    const reportBaseUrl = `${baseUrl}/report/history/euComplianceReport?id=`;
    
    const driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();
    // let driver = await new Builder().forBrowser('chrome').build();
  
     // 1. Navegar para a página de login
    await driver.get(baseUrl);

    // 2. Clicar no primeiro botão com a classe 'choose-profile-button'
    await driver.findElement(By.xpath('/html/body/main/div/div[2]/div/div/main/div/div[2]/div/button[1]')).click();

    // 3. Preencher o campo CPF
    await driver.wait(until.elementLocated(By.name('campoCPF')), 10000);
    await driver.findElement(By.name('campoCPF')).sendKeys('042.089.203-60');

    // 4. Clicar no botão "Continuar"
    await driver.findElement(By.xpath('/html/body/main/div/div[2]/div/div/main/div/div[2]/div/button[1]')).click();

    // 5. Preencher o campo Senha
    await driver.wait(until.elementLocated(By.name('campoSenha')), 10000);
    await driver.findElement(By.name('campoSenha')).sendKeys('Comercial@123');

    // 6. Clicar no botão "Entrar"
    await driver.findElement(By.xpath('/html/body/main/div/div[2]/div/div/main/div/div[2]/div/button[1]')).click();

    await driver.sleep(5000);

    for (const item of test) {
      const reportUrl = `${reportBaseUrl}${'8eda1822-1674-4bec-a7cc-cb89b282c1e5'}`;
      
      // 7. Navegar para a página do relatório
      await driver.get(reportUrl);

      // Scroll até o final da página
      await driver.executeScript("window.scrollTo(0, document.body.scrollHeight);");

      // 8. Esperar que o botão "Imprimir" esteja visível
      await driver.wait(until.elementLocated(By.xpath('/html/body/div[1]/div/main/div/div[1]/div[2]/button')), 10000);

      await driver.sleep(5000);

      // 9. Clicar no botão "Gerar PDF"
      await driver.findElement(By.xpath('/html/body/div[1]/div/main/div/div[1]/div[2]/button')).click();

      // 10. Executar o AppleScript para interagir com a caixa de diálogo "Salvar como PDF"
      exec('osascript ./save_pdf.scpt', (error, stdout, stderr) => {
        if (error) {
          console.error(`Erro ao executar AppleScript: ${error.message}`);
          return;
        }
        console.log('PDF salvo com sucesso');
      });

      await driver.sleep(10000);  // Aguarda 5 segundos
    }

    res.send('Todos os relatórios foram gerados e salvos com sucesso.');
  } catch (error) {
    console.error('Erro ao gerar o relatório:', error);
    res.status(500).send('Erro ao gerar o relatório');
  } finally {
    // await driver.quit();
  }
});

app.listen(port, () => {
  console.log(`PDF generation service running at http://localhost:${port}`);
});
