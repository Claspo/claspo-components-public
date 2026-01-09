import {EmailSuggesting} from "./EmailSuggesting";

describe('EmailSuggestingService.suggestEmail', () => {

  it('should pass story testcases', () => {
    expect(EmailSuggesting.suggestEmailSync(`abc@gamil.com`)).toEqual('gmail.com');
    expect(EmailSuggesting.suggestEmailSync(`abc@gmal.com`)).toEqual('gmail.com');
    expect(EmailSuggesting.suggestEmailSync(`abc@gmil.com`)).toEqual('gmail.com');
    expect(EmailSuggesting.suggestEmailSync(`abc@gmgil.com`)).toEqual('gmail.com');
    expect(EmailSuggesting.suggestEmailSync(`abc@gmaill.com`)).toEqual('gmail.com');

    expect(EmailSuggesting.suggestEmailSync(`abc@outllook.com`)).toEqual('outlook.com');

    expect(EmailSuggesting.suggestEmailSync(`abc@yaho.com`)).toEqual('yahoo.com');
    expect(EmailSuggesting.suggestEmailSync(`abc@yanoo.com`)).toEqual('yahoo.com');

    expect(EmailSuggesting.suggestEmailSync(`abc@aol.cm`)).toEqual('aol.com');

    expect(EmailSuggesting.suggestEmailSync(`abc@hotmil.com`)).toEqual('hotmail.com');

    expect(EmailSuggesting.suggestEmailSync(`abc@mail.cm`)).toEqual('mail.com');

    expect(EmailSuggesting.suggestEmailSync(`abc@protonmaill.com`)).toEqual('protonmail.com');

    expect(EmailSuggesting.suggestEmailSync(`abc@gm.com`)).toEqual('gmx.com');

    expect(EmailSuggesting.suggestEmailSync(`abc@zoho.cm`)).toEqual('zoho.com');

    // hushail.com -> hushmail.com - BE
    // fastmal.com -> fastmail.com - BE

    expect(EmailSuggesting.suggestEmailSync(`abc@tutantota.com`)).toEqual('tutanota.com');

    // runbx.com -> runbox.com - BE
    // lycos.cm -> lycos.com - BE
    // inbx.com -> inbox.com - BE
    // netcourierr.com -> netcourrier.com - BE
    // rackspce.com -> rackspace.com - BE
    // bluhst.com -> bluehost.com - BE

    expect(EmailSuggesting.suggestEmailSync(`abc@gmc.com`)).toEqual('gmx.com');
    expect(EmailSuggesting.suggestEmailSync(`abc@mx.com`)).toEqual('gmx.com');
    expect(EmailSuggesting.suggestEmailSync(`abc@gmx.com`)).toEqual(null);
    expect(EmailSuggesting.suggestEmailSync(`abc@mc.com`)).toEqual(null);
  });

});
