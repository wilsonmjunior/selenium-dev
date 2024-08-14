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

const test = [
  // {
  //   id: '8eda1822-1674-4bec-a7cc-cb89b282c1e5',
  //   farmName: 'FAZENDA VASSOURAL|T - P4|461'
  // },
  // {
  //   id: '9d84e8c8-ded2-405d-95d6-a41f74a2683c',
  //   farmName: 'FAZENDA VASSOURAL|T - P3|460'
  // },
  // {
  //   id: '292a118c-55e1-4008-a120-08b6ffa031c2',
  //   farmName: 'FAZENDA VASSOURAL|T - P2|459'
  // },
  // {
  //   id: '7703693b-596c-448c-9607-b79e974becea',
  //   farmName: 'FAZENDA VASSOURAL|T - P2|458'
  // },
  // {
  //   id: 'bd36d3f9-57d6-4f11-96fb-068e329730bb',
  //   farmName: 'FAZENDA VASSOURAL|T - P2|457'
  // },
  // {
  //   id: '26e1e126-110a-4ea1-a6a5-53fb3c0b8fdd',
  //   farmName: 'FAZENDA VASSOURAL|T - P2|456'
  // },
  // {
  //   id: 'b054fe40-29fa-4605-9335-e604620b0e16',
  //   farmName: 'FAZENDA VASSOURAL|T - P1|455'
  // },
  // {
  //   id: '207163a8-536d-4dca-a5e5-ec953c9307e3',
  //   farmName: 'FAZENDA VASSOURAL|V-8|454'
  // },
  // {
  //   id: '5acbc787-41ec-4b13-9a5d-142f7981446f',
  //   farmName: 'FAZENDA VASSOURAL|V-7|453'
  // },
  // {
  //   id: '620d9327-6727-47fe-a303-192ca9d6e630',
  //   farmName: 'FAZENDA VASSOURAL|V-7|452'
  // },
  // {
  //   id: '9e0f2e2e-be3e-4425-9dc7-b4d4219470a4',
  //   farmName: 'FAZENDA VASSOURAL|V-6|451'
  // },
  // {
  //   id: '8bdb7d02-427f-489a-a9c7-bcec43c85917',
  //   farmName: 'FAZENDA VASSOURAL|V-5.9|450'
  // },
  // {
  //   id: '15de27da-c1dc-4304-a39f-6bfdfe71b0b9',
  //   farmName: 'FAZENDA VASSOURAL|V-5.9|449'
  // },
  // {
  //   id: 'f6b69497-aef8-477f-95d8-a11d689b7d43',
  //   farmName: 'FAZENDA VASSOURAL|V-4|448'
  // },
  // {
  //   id: 'b925be4f-759a-4bc4-9e94-4e38686b66bb',
  //   farmName: 'FAZENDA VASSOURAL|V-3|447'
  // },
  // {
  //   id: '51642cd6-397a-43df-ac1f-4b96d976850b',
  //   farmName: 'FAZENDA VASSOURAL|V-3|446'
  // },
  // {
  //   id: '1ef59f58-bb28-4051-b42b-df41fad7fb60',
  //   farmName: 'FAZENDA VASSOURAL|V-2|445'
  // },
  // {
  //   id: '4cc3a8ec-a269-495c-bbdc-5371055d6410',
  //   farmName: 'FAZENDA VASSOURAL|V-1|444'
  // },
  // {
  //   id: '96f3a81d-b78f-4b47-9349-abe9b73476eb',
  //   farmName: 'FAZENDA TORRES|T - Fatima|443'
  // },
  // {
  //   id: '32f9b94f-4bc9-4ba5-8e1e-0913aa0d94a0',
  //   farmName: 'FAZENDA SERTANEJO|T - 4.10 [1]|442'
  // },
  // {
  //   id: '677db2aa-32a5-4bfd-9920-e4091e41af55',
  //   farmName: 'FAZENDA SERTANEJO|T - 4.09 [1]|441'
  // },
  // {
  //   id: '0f2936b5-0250-4781-a59b-0504e9f36e73',
  //   farmName: 'FAZENDA SERTANEJO|T - 4.08 [1]|440'
  // },
  {
    id: '68039e78-0626-4ce1-9b27-f8ae328160b5',
    farmName: 'FAZENDA SERTANEJO|T - 4.08 [1]|439'
  },
  // {
  //   id: 'bead86f3-224a-4743-9367-acca09de2abb',
  //   farmName: 'FAZENDA SERTANEJO|T - 4.07 [1]|438'
  // },
  // {
  //   id: '80704c8e-d22e-4eb1-8855-c2eede87fb04',
  //   farmName: 'FAZENDA SERTANEJO|T - 4.07 [1]|437'
  // },
  // {
  //   id: '760fdf68-66ae-4bb5-b251-1c073499a36b',
  //   farmName: 'FAZENDA SERTANEJO|T - 4.06 [1]|436'
  // },
  // {
  //   id: '3a59805f-19df-4913-99c7-88f8050cf479',
  //   farmName: 'FAZENDA SERTANEJO|T - 4.05 [1]|435'
  // },
  // {
  //   id: '96fd448d-28cd-4798-a793-43bb60cc6b55',
  //   farmName: 'FAZENDA SERTANEJO|T- 4.04 [1]|434'
  // },
  // {
  //   id: '480994c2-8896-48fe-b250-8c17111f9a6d',
  //   farmName: 'FAZENDA SERTANEJO|T - 4.03 [1]|433'
  // },
  // {
  //   id: '7ff58b53-f8fc-4322-ae6e-1eeefb2f7d7c',
  //   farmName: 'FAZENDA SERTANEJO|T - 4.02 [1]|432'
  // },
  // {
  //   id: '818722f3-6236-43ee-87d8-662f6ca0adf8',
  //   farmName: 'FAZENDA SERTANEJO|T - 4.02 [1]|431'
  // },
  // {
  //   id: '5fe4c701-9eb4-4837-a2d7-cdb68a59fa7c',
  //   farmName: 'FAZENDA SERTANEJO|T - 4.01 [1]|430'
  // },
  // {
  //   id: '0508f9af-6990-4e55-9cf1-3db3fe131b5d',
  //   farmName: 'FAZENDA SERTANEJO|T - 4.01 [1]|429'
  // },
  // {
  //   id: '465b674d-9c3c-4c84-a177-d837485bac2f',
  //   farmName: 'FAZENDA SÃO PEDRO - D|T SR 5|428'
  // },
  // {
  //   id: '515f95af-250e-4799-85fc-a567f0f12684',
  //   farmName: 'FAZENDA SÃO PEDRO - D|T SR 4|427'
  // },
  // {
  //   id: '96f7fdf0-0824-448e-b44d-79cfd76c4495',
  //   farmName: 'FAZENDA SÃO PEDRO - D|T SR 3|426'
  // },
  // {
  //   id: 'e804cd46-a22e-47e6-90e8-2a9c5a784983',
  //   farmName: 'FAZENDA SÃO PEDRO - D|T SR 3|425'
  // },
  // {
  //   id: 'a63f56a7-7380-4ef0-95ef-49a9b4aa54db',
  //   farmName: 'FAZENDA SÃO PEDRO - D|T SR 3|424'
  // },
  // {
  //   id: '83312112-c86d-42a1-a207-7428080608e7',
  //   farmName: 'FAZENDA SÃO PEDRO - D|T SR 2|423'
  // },
  // {
  //   id: '5861b69e-5ff6-4b38-9318-3c10dbe86dea',
  //   farmName: 'FAZENDA SÃO PEDRO - C|T Luis|422'
  // },
  // {
  //   id: 'bd809062-8cfe-4d0a-bd63-863a4b5f5e25',
  //   farmName: 'FAZENDA SÃO PEDRO - C|T Luis|421'
  // },
  // {
  //   id: 'b7466e32-3257-49e5-899f-6abeeb0523d8',
  //   farmName: 'FAZENDA SÃO PEDRO - C|T Fazendinha|420'
  // },
  // {
  //   id: '63a095af-1fc4-4185-b0d7-a542724f47eb',
  //   farmName: 'FAZENDA SÃO PEDRO - C|T Fazendinha|419'
  // },
  // {
  //   id: '625db1ca-f6b1-4765-8f14-b3fb9d807711',
  //   farmName: 'FAZENDA SÃO PEDRO - C|T Fazendinha|418'
  // },
  // {
  //   id: '48915398-82c8-48cf-a0f6-5d12a463adaf',
  //   farmName: 'FAZENDA SÃO PEDRO - C|T Farah|417'
  // },
  // {
  //   id: '3ad3a37d-3d2b-469e-91a1-0adf5295d7a8',
  //   farmName: 'FAZENDA SÃO PEDRO - C|T Farah|416'
  // },
  // {
  //   id: '25fd37a2-be79-4e03-ba12-7ed4a71aaf0a',
  //   farmName: 'FAZENDA SÃO PEDRO - C|T Farah|415'
  // },
  // {
  //   id: 'ea95c11a-c808-4fbe-a60d-efc29ce731a3',
  //   farmName: 'FAZENDA SÃO PEDRO - C|T Farah|414'
  // },
  // {
  //   id: 'f9f48581-37c1-4fc4-be7c-cb6d486de641',
  //   farmName: 'FAZENDA SÃO PEDRO - C|T Farah|413'
  // },
  // {
  //   id: 'f32fa96c-71a6-495b-8978-1322f6b50856',
  //   farmName: 'FAZENDA SÃO PEDRO - C|T Farah|412'
  // },
  // {
  //   id: '104593cf-8267-4edb-9132-e346627636af',
  //   farmName: 'FAZENDA SÃO PEDRO - C|T Farah|411'
  // },
  // {
  //   id: '9a04e66b-eeed-4b0a-958f-a6a6bffc8ae6',
  //   farmName: 'FAZENDA SÃO PEDRO - C|T Farah|410'
  // },
  // {
  //   id: '81f31882-f4d4-47d6-8320-b9c0fa57cc0e',
  //   farmName: 'FAZENDA SÃO PEDRO - C|T Farah|409'
  // },
  // {
  //   id: '4d23a663-0f06-40e6-925b-e22d06408f9e',
  //   farmName: 'FAZENDA SÃO PEDRO - C|T Farah|408'
  // },
  // {
  //   id: '1340689c-f92a-4df7-bd4e-98f124791e9b',
  //   farmName: 'FAZENDA SÃO PEDRO - C|T Aurora|407'
  // },
  // {
  //   id: '41f553e5-1c4e-44a3-889c-3143aac0c441',
  //   farmName: 'FAZENDA SÃO PEDRO - C|T Aurora|406'
  // },
  // {
  //   id: 'b0011b20-d49b-4ca3-8b53-3494ca676d58',
  //   farmName: 'FAZENDA SÃO PEDRO - C|T Arejado (16 17)|405'
  // },
  // {
  //   id: '41e03146-d85b-4640-ac87-3f609cd73f68',
  //   farmName: 'FAZENDA SÃO PEDRO - C|T Arejado (16 17)|404'
  // },
  // {
  //   id: 'e6f08a58-f4d3-447d-873b-4487562554cb',
  //   farmName: 'FAZENDA SÃO PEDRO - C|T Arejado(15 18)|403'
  // },
  // {
  //   id: '4c2ea749-9610-4948-bacf-2a871038af0f',
  //   farmName: 'FAZENDA SÃO PEDRO - C|T Arejado(12 13 14)|402'
  // },
  // {
  //   id: '6936ab4e-84bd-40f8-a5da-024f83b633a5',
  //   farmName: 'FAZENDA SÃO PEDRO - C|T Arejado(12 13 14)|401'
  // },
  // {
  //   id: '9a798593-b5c5-4169-b27e-88a6af7d8ae9',
  //   farmName: 'FAZENDA SÃO PEDRO - C|T Arejado(12 13 14)|400'
  // },
  // {
  //   id: 'f5338b2f-04f5-4f8d-8a9c-f594dc6ca222',
  //   farmName: 'FAZENDA SÃO PEDRO - C|T Acir 11|399'
  // },
  // {
  //   id: '0b36d6d2-bfef-41bc-9547-717db32066a8',
  //   farmName: 'FAZENDA SÃO PEDRO - C|T Acir 10|398'
  // },
  // {
  //   id: '36f2ef8a-f8b4-401e-8434-7dac418a8743',
  //   farmName: 'FAZENDA SÃO PEDRO - C|T Acir 09|397'
  // },
  {
    id: '03310f48-00a4-4644-838f-fc84110587fb',
    farmName: 'FAZENDA SÃO PEDRO - BIANOR|T - sede|396'
  },
  {
    id: '6cd5ab1d-fac7-4cdf-9ccf-1257c8c98c77',
    farmName: 'FAZENDA SÃO PEDRO - BIANOR|T - morro|395'
  },
  {
    id: 'd6561ddc-7d45-4bf3-ae72-b8bbb020b838',
    farmName: 'FAZENDA SÃO PEDRO - BIANOR|T - meio|394'
  },
  {
    id: '4d947bfb-3fbd-461f-85c6-514470b9449a',
    farmName: 'FAZENDA SÃO PEDRO - BIANOR|T - frente|393'
  },
  {
    id: 'e2192994-4a0f-475a-bdd3-6be3a25318b6',
    farmName: 'FAZENDA SÃO PEDRO - BIANOR|T - cemiterio|392'
  },
  {
    id: 'ed661794-b565-4ef4-a724-34d495efbace',
    farmName: 'FAZENDA SÃO PEDRO - BIANOR|T - calcamento|391'
  },
  {
    id: '4045bd46-7b16-4467-a087-e09d8204f69b',
    farmName: 'FAZENDA SÃO PEDRO - BIANOR|T - calcamento|390'
  },
  {
    id: 'afa78785-305d-4d2e-988f-9bbfd6f91d16',
    farmName: 'FAZENDA SÃO PEDRO - B|T ODA|389'
  },
  {
    id: 'bdb4e187-7d20-4a72-9d5f-73881fe39a5b',
    farmName: 'FAZENDA SÃO PEDRO - B|T ODA|388'
  },
  {
    id: '34073f23-3e81-4616-b21f-aed0ba3de35d',
    farmName: 'FAZENDA SÃO PEDRO - B|T ODA|387'
  },
  {
    id: '3df7148b-4102-4c31-9de8-36843a61d6b5',
    farmName: 'FAZENDA SÃO PEDRO - B|T ODA|386'
  },
  {
    id: 'dd8d886a-33cc-467f-a4ae-6ce349520281',
    farmName: 'FAZENDA SÃO PEDRO - B|T ODA|385'
  },
  {
    id: '010221bc-c709-42a3-a65a-7a97d97d4e50',
    farmName: 'FAZENDA SÃO PEDRO - B|T Naiverth (Arrendado)|384'
  },
  {
    id: 'a03eaf4e-d916-4a51-a2b7-408d70331bf2',
    farmName: 'FAZENDA SÃO PEDRO - B|T Jaboticabal|383'
  },
  {
    id: '4ae9af39-5f00-4357-a396-1adac9b2c9b4',
    farmName: 'FAZENDA SÃO PEDRO - B|T Jaboticabal|382'
  },
  {
    id: 'ecc33776-c995-4699-bb13-fbeba45682e7',
    farmName: 'FAZENDA SÃO PEDRO - B|T Jaboticabal|381'
  },
  {
    id: '6808c45a-879c-4f5e-91af-b56bbc7ade59',
    farmName: 'FAZENDA SÃO PEDRO - B|T Arismari|380'
  },
  {
    id: '717abb26-6b77-40df-8b85-89e55b20c84a',
    farmName: 'FAZENDA SÃO PEDRO - B|T 08|379'
  },
  {
    id: '1fa348c6-6374-4066-aab5-b20bbc504cc6',
    farmName: 'FAZENDA SÃO PEDRO - B|T 07|378'
  },
  {
    id: '889be33b-5887-4f54-9658-9373c2345c21',
    farmName: 'FAZENDA SÃO PEDRO - B|T 06|377'
  },
  {
    id: '1bd0de1c-9ad2-4d9b-af46-a42f2c7870fe',
    farmName: 'FAZENDA SÃO PEDRO - B|T 05|376'
  },
  {
    id: '8b2f7536-9f60-43b0-be47-f76a04fc616f',
    farmName: 'FAZENDA SÃO PEDRO - B|T 05|375'
  },
  {
    id: '28bcb26f-3856-4c14-bd12-b3595f3fb4eb',
    farmName: 'FAZENDA SÃO PEDRO - B|T 04|374'
  },
  {
    id: 'ac67e786-4a56-404e-98bd-b3512d13356a',
    farmName: 'FAZENDA SÃO PEDRO - B|T 03|373'
  },
  {
    id: '24fd98c9-2463-498b-a6f6-9db8f9c1a86a',
    farmName: 'FAZENDA SÃO PEDRO - B|T 02|372'
  },
  {
    id: '924e1b49-f8ca-42a4-b1d7-7c55bf6373d5',
    farmName: 'FAZENDA SÃO PEDRO - B|T 01|371'
  },
  {
    id: 'b1e579e9-1f96-4847-9375-0b3b11b07540',
    farmName: 'FAZENDA SÃO PEDRO - B|T 01|370'
  },
  // {
  //   id: '50692625-11f5-4185-b9e6-ecc97c2636f0',
  //   farmName: 'FAZENDA SÃO PEDRO|T- Pastagem|369'
  // },
  // {
  //   id: 'ce8a1a96-2b33-4d53-9f88-f665c975185a',
  //   farmName: 'FAZENDA SÃO PEDRO|T- Pastagem|368'
  // },
  // {
  //   id: 'b88ba69a-253a-4bef-b339-230057708594',
  //   farmName: 'FAZENDA SÃO PEDRO|T- Pastagem|367'
  // },
  // {
  //   id: 'b57a951d-e064-4faf-9cc8-34f5eb78d215',
  //   farmName: 'FAZENDA SÃO PEDRO|T- Pastagem|366'
  // },
  // {
  //   id: 'd9af51a1-45d5-46fe-8acd-169fa0a95cdb',
  //   farmName: 'FAZENDA SÃO PEDRO|T- Pastagem|365'
  // },
  // {
  //   id: 'd573f6a7-95cf-44b0-914c-057252d2657d',
  //   farmName: 'FAZENDA SÃO PEDRO|T- Mangueiras|364'
  // },
  // {
  //   id: '469a0cc8-9141-41a7-900a-abe9ea693e22',
  //   farmName: 'FAZENDA SÃO PEDRO|T- Mangueiras|363'
  // },
  // {
  //   id: 'cb44e31c-8d8e-44bb-9434-9781925e1104',
  //   farmName: 'FAZENDA SÃO PEDRO|T- Mangueiras|362'
  // },
];

// const test = [{
//   id: '68039e78-0626-4ce1-9b27-f8ae328160b5',
//   farmName: 'FAZENDA SÃO PEDRO|T- Mangueiras|362'
// }]

const driver = new Builder().forBrowser('chrome').setChromeOptions(options).build();

app.get('/generate-pdf', async (req, res) => {
  try {
    const baseUrl = "http://localhost:3000/";
    const reportBaseUrl = `${baseUrl}/report/history/euComplianceReport?id=`;
    
    // let driver = await new Builder().forBrowser('chrome').build();
  
     // 1. Navegar para a página de login
    await driver.get(baseUrl);

    // 2. Clicar no primeiro botão com a classe 'choose-profile-button'
    await driver.findElement(By.xpath('/html/body/main/div/div[2]/div/div/main/div/div[2]/div/button[1]')).click();

    // 3. Preencher o campo CPF
    await driver.wait(until.elementLocated(By.name('campoCPF')), 5000);
    await driver.findElement(By.name('campoCPF')).sendKeys('042.089.203-60');

    // 4. Clicar no botão "Continuar"
    await driver.findElement(By.xpath('/html/body/main/div/div[2]/div/div/main/div/div[2]/div/button[1]')).click();

    // 5. Preencher o campo Senha
    await driver.wait(until.elementLocated(By.name('campoSenha')), 5000);
    await driver.findElement(By.name('campoSenha')).sendKeys('Comercial@123');

    // 6. Clicar no botão "Entrar"
    await driver.findElement(By.xpath('/html/body/main/div/div[2]/div/div/main/div/div[2]/div/button[1]')).click();

    await driver.sleep(5000);

    for (const item of test) {
      const reportUrl = `${reportBaseUrl}${item.id}`;
      
      // Navegar para a página do relatório
      await driver.get(reportUrl);

      // Scroll até o final da página                    
      
      // Esperar que o botão "Imprimir" esteja visível
      await driver.wait(until.elementLocated(By.xpath('/html/body/div[1]/div/main/div/div[1]/div[2]/button')), 10000);
      
      await driver.sleep(10000);

      // Clicar no botão "Gerar PDF"
      await driver.findElement(By.xpath('/html/body/div[1]/div/main/div/div[1]/div[2]/button')).click();

      // Executar o AppleScript para interagir com a caixa de diálogo "Salvar como PDF"
      exec('osascript ./save_pdf.scpt', (error, stdout, stderr) => {
        if (error) {
          console.error(`Erro ao executar AppleScript: ${error.message}`);
          return;
        }
        console.log('PDF salvo com sucesso');
      });

      await driver.sleep(5000);  // Aguarda 5 segundo
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
