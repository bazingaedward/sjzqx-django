# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('cms', '0016_auto_20160608_1535'),
        ('sjzqx', '0002_category_categoryextension'),
    ]

    operations = [
        migrations.CreateModel(
            name='YbyjExtension',
            fields=[
                ('id', models.AutoField(serialize=False, verbose_name='ID', primary_key=True, auto_created=True)),
                ('extended_object', models.OneToOneField(editable=False, to='cms.Page')),
                ('public_extension', models.OneToOneField(null=True, editable=False, to='sjzqx.YbyjExtension', related_name='draft_extension')),
            ],
            options={
                'abstract': False,
            },
        ),
        migrations.AlterModelOptions(
            name='ybyj',
            options={'verbose_name_plural': '预报预警'},
        ),
        migrations.AddField(
            model_name='ybyjextension',
            name='ybyj',
            field=models.ForeignKey(to='sjzqx.ybyj'),
        ),
    ]
